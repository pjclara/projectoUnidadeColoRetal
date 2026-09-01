<?php

namespace App\Http\Controllers;

use App\Actions\Doente\CreateDoenteAction;
use App\Actions\Doente\DeleteDoenteAction;
use App\Actions\Doente\UpdateDoenteAction;
use App\Http\Requests\StoreDoenteRequest;
use App\Http\Requests\UpdateDoenteRequest;
use App\Models\Doente;
use App\Services\EncryptionService;
use App\ViewModels\DoenteViewModel;
use Inertia\Inertia;
use Illuminate\Http\Request;


class DoenteController extends Controller
{
    public function __construct(
        private EncryptionService $encryptionService
    ) {}


    public function index(Request $request)
    {
        $search = $request
            ->string('search')
            ->trim()
            ->toString();

        $sexo = $request
            ->string('sexo')
            ->trim()
            ->toString();

        $doentes = Doente::query()
            ->when($search, function ($query) use ($search) {
                $searchHash = $this->encryptionService
                    ->searchableHashNormalized($search);

                $query->where(function ($query) use ($searchHash) {
                    $query->where('nome_hash', $searchHash)
                        ->orWhere('pu_hash', $searchHash);
                });
            })
            ->when($sexo, function ($query) use ($sexo) {
                $query->where('sexo', $sexo);
            })
            ->paginate(15)
            ->withQueryString()
            ->through(function (Doente $doente) {
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

                    'data_nascimento' => $doente->data_nascimento
                        ? $doente->data_nascimento->format('Y-m-d')
                        : null,
                    'sexo' => $doente->sexo,
                    'created_at' => $doente->created_at,
                    'updated_at' => $doente->updated_at,
                ];
            });

        return Inertia('Doentes/Index', [
            'doentes' => $doentes,

            'filters' => [
                'search' => $search,
                'sexo' => $sexo,
            ],

            'sexos' => [
                ['id' => 'M', 'nome' => 'Masculino'],
                ['id' => 'F', 'nome' => 'Feminino'],
                ['id' => 'O', 'nome' => 'Outro'],
            ],
        ]);
    }



    public function store(
        StoreDoenteRequest $request,
        CreateDoenteAction $action
    ) {
        $action->execute(
            $request->validated()
        );

        return back()->with('success', 'Doente criado com sucesso.');
    }

    public function show(Doente $doente)
    {
        return Inertia::render('Doentes/Show', [
            'doente' => (new DoenteViewModel(
                $doente,
                $this->encryptionService
            ))->toArray(),
        ]);
    }


    public function update(
        UpdateDoenteRequest $request,
        Doente $doente,
        UpdateDoenteAction $action
    ) {
        $action->execute(
            $doente,
            $request->validated()
        );

        return redirect()
            ->route('doentes.index')
            ->with('success', 'Doente atualizado com sucesso.');
    }

    public function destroy(
        Doente $doente,
        DeleteDoenteAction $action
    ) {
        $action->execute($doente);

        return redirect()
            ->route('doentes.index')
            ->with('success', 'Doente eliminado com sucesso.');
    }
}
