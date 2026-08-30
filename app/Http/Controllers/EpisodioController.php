<?php

namespace App\Http\Controllers;
use App\ViewModels\DoenteViewModel;
use Illuminate\Http\Request;
use App\Models\Doente;
use App\Services\EncryptionService;

use App\Http\Requests\StoreEpisodioRequest;
use App\Http\Requests\UpdateEpisodioRequest;
use App\Models\Episodio;
use App\Services\EpisodioService;
use Inertia\Inertia;

class EpisodioController extends Controller
{
    public function __construct(
        private EpisodioService $service,
        private EncryptionService $encryptionService,
    ) {}

    /**
     * Display a listing of the resource.
     */
public function index()
{
    $episodios = Episodio::with([
        'doente',
        'user:id,name',
    ])
        ->paginate(10)
        ->through(function (Episodio $episodio) {
            return [
                'id' => $episodio->id,

                'doente' => $episodio->doente
                    ? (new DoenteViewModel($episodio->doente, $this->encryptionService))->toArray()
                    : null,

                'tipo' => $episodio->tipo,
                'diagnostico' => $episodio->diagnostico,
                'cid10' => $episodio->cid10,
                'data_diagnostico' => $episodio->data_diagnostico?->format('Y-m-d'),
                'centro_referencia' => $episodio->centro_referencia,
                'pai_entrada' => $episodio->pai_entrada?->format('Y-m-d'),
                'pai_saida' => $episodio->pai_saida?->format('Y-m-d'),
                'motivo_saida' => $episodio->motivo_saida,
                'estado' => $episodio->estado,
                'observacoes' => $episodio->observacoes,
                'user_id' => $episodio->user_id,

                'user' => $episodio->user
                    ? [
                        'id' => $episodio->user->id,
                        'name' => $episodio->user->name,
                    ]
                    : null,

                'created_at' => $episodio->created_at,
                'updated_at' => $episodio->updated_at,
            ];
        });

    return Inertia('Episodios/Index', [
        'episodios' => $episodios,
        'filters' => request()->only(['search']),
        'users' => \App\Models\User::select('id', 'name')->get(),
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $pu = $request->string('pu')->trim()->toString();
        $nome = $request->string('nome')->trim()->toString();
        $dataNascimento = $request->string('data_nascimento')->trim()->toString();
        $selectedDoente = $request->integer('doente_id') ?: null;

        $doentes = Doente::query()
            ->when($pu, fn($query) => $query->where(
                'pu_hash',
                $this->encryptionService->searchableHashNormalized($pu),
            ))
            ->when($nome, fn($query) => $query->where(
                'nome_hash',
                $this->encryptionService->searchableHashNormalized($nome),
            ))
            ->when($request->string('search')->trim()->toString() && ! $pu && ! $nome, function ($query) use ($request) {
                $search = $request->string('search')->trim()->toString();
                $hash = $this->encryptionService->searchableHashNormalized($search);

                $query->where(fn($query) => $query
                    ->where('nome_hash', $hash)
                    ->orWhere('pu_hash', $hash));
            })
            ->when($dataNascimento, fn($query) => $query->where('data_nascimento', $dataNascimento))
            ->latest()
            ->paginate(10, ['*'], 'doentes_page')
            ->withQueryString()
            ->through(fn(Doente $doente) => $this->serializeDoente($doente));

        $doente = $selectedDoente
            ? Doente::find($selectedDoente)
            : null;

        return Inertia::render('Episodios/Create', [
            'doentes' => $doentes,
            'selectedDoente' => $doente ? $this->serializeDoente($doente) : null,
            'episodios' => fn() => $doente
                ? $this->service->forDoente($doente->id)
                ->through(fn($episodio) => [
                    'id' => $episodio->id,
                    'doente_id' => $episodio->doente_id,
                    'diagnostico' => $episodio->diagnostico,
                    'data_diagnostico' => $episodio->data_diagnostico?->format('Y-m-d'),
                    'tipo' => $episodio->tipo,
                    'estado' => $episodio->estado,
                    'motivo' => $episodio->motivo,
                    'observacoes' => $episodio->observacoes,
                    'utilizador' => $episodio->user?->name,
                ])
                : null,
            'filters' => [
                'search' => $request->string('search')->trim()->toString(),
                'pu' => $pu,
                'nome' => $nome,
                'data_nascimento' => $dataNascimento,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEpisodioRequest $request)
    {
        $validated = $request->validated();

        $episodio = $this->service->create($validated, $request->user()->id);

        return back()
            ->with('success', 'Episódio criado com sucesso.')
            ->with('created_episodio', [
                'id' => $episodio->id,
                'doente_id' => $episodio->doente_id,
                'tipo' => $episodio->tipo,
                'diagnostico' => $episodio->diagnostico,
                'cid10' => $episodio->cid10,
                'data_diagnostico' => $episodio->data_diagnostico?->format('Y-m-d'),
                'estado' => $episodio->estado,
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Episodio $episodio)
    {
        return Inertia::render('Episodios/Show', [
            'episodio' => $this->service->serializeEpisodio($episodio),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Episodio $episodio)
    {
        return Inertia::render('Episodios/Show', [
            'episodio' => $this->service->serializeEpisodio($episodio),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEpisodioRequest $request, Episodio $episodio)
    {
        $validated = $request->validated();

        $this->service->update($episodio, $validated);

        return back()->with('success', 'Episódio atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Episodio $episodio)
    {
        $this->service->delete($episodio);

        return redirect()->route('episodios.index')
            ->with('success', 'Episódio eliminado com sucesso.');
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
