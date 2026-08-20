<?php

namespace App\Http\Controllers;

use App\Actions\Doente\CreateDoenteAction;
use App\Http\Requests\StoreDoenteRequest;
use App\Models\Doente;
use App\Services\EncryptionService;
use App\Services\EpisodioService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AtendimentoController extends Controller
{
    public function __construct(
        private EncryptionService $encryptionService,
        private EpisodioService $episodioService,
    ) {}

    public function create(Request $request)
    {
        $search = $request->string('search')->trim()->toString();
        $pu = $request->string('pu')->trim()->toString();
        $nome = $request->string('nome')->trim()->toString();
        $dataNascimento = $request->string('data_nascimento')->trim()->toString();
        $selectedDoente = $request->integer('doente_id') ?: null;

        $doentes = Doente::query()
            ->when($pu, fn ($query) => $query->where(
                'pu_hash',
                $this->encryptionService->searchableHashNormalized($pu),
            ))
            ->when($nome, fn ($query) => $query->where(
                'nome_hash',
                $this->encryptionService->searchableHashNormalized($nome),
            ))
            ->when($search && ! $pu && ! $nome, function ($query) use ($search) {
                $hash = $this->encryptionService->searchableHashNormalized($search);

                $query->where(fn ($query) => $query
                    ->where('nome_hash', $hash)
                    ->orWhere('pu_hash', $hash));
            })
            ->when($dataNascimento, fn ($query) => $query->where('data_nascimento', $dataNascimento))
            ->latest()
            ->paginate(10, ['*'], 'doentes_page')
            ->withQueryString()
            ->through(fn (Doente $doente) => $this->serializeDoente($doente));

        $doente = $selectedDoente
            ? Doente::find($selectedDoente)
            : null;

        return Inertia::render('Atendimentos/Wizard', [
            'doentes' => $doentes,
            'selectedDoente' => $doente ? $this->serializeDoente($doente) : null,
            'episodios' => fn () => $doente
                ? $this->episodioService->forDoente($doente->id)
                    ->through(fn ($episodio) => [
                        'id' => $episodio->id,
                        'doente_id' => $episodio->doente_id,
                        'data_episodio' => $episodio->data_episodio?->format('Y-m-d'),
                        'tipo' => $episodio->tipo,
                        'estado' => $episodio->estado,
                        'motivo' => $episodio->motivo,
                        'observacoes' => $episodio->observacoes,
                        'utilizador' => $episodio->utilizador?->name,
                    ])
                : null,
            'filters' => [
                'search' => $search,
                'pu' => $pu,
                'nome' => $nome,
                'data_nascimento' => $dataNascimento,
            ],
        ]);
    }

    public function storeDoente(StoreDoenteRequest $request, CreateDoenteAction $action)
    {
        $doente = $action->execute($request->validated());

        return redirect()
            ->route('atendimentos.create', ['doente_id' => $doente->id])
            ->with('created_doente', $this->serializeDoente($doente))
            ->with('success', 'Doente criado com sucesso.');
    }

    private function serializeDoente(Doente $doente): array
    {
        return [
            'id' => $doente->id,
            'nome' => $this->encryptionService->decrypt(
                $doente->nome_cipher,
                $doente->nome_iv,
                $doente->nome_tag,
            ),
            'pu' => $this->encryptionService->decrypt(
                $doente->pu_cipher,
                $doente->pu_iv,
                $doente->pu_tag,
            ),
            'data_nascimento' => $doente->data_nascimento?->format('Y-m-d'),
            'sexo' => $doente->sexo,
        ];
    }
}
