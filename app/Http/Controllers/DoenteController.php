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

class DoenteController extends Controller
{
    public function __construct(
        private EncryptionService $encryptionService
    ) {}

  public function index()
    {
        $doentes = Doente::query()
            ->latest()
            ->paginate(15)
            ->through(
                fn (Doente $doente) =>
                    (new DoenteViewModel(
                        $doente,
                        $this->encryptionService
                    ))->toArray()
            );

        return Inertia::render('Doentes/Index', [
            'doentes' => $doentes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Doentes/Create');
    }

    public function store(
        StoreDoenteRequest $request,
        CreateDoenteAction $action
    ) {
        $action->execute(
            $request->validated()
        );

        return redirect()
            ->route('doentes.index')
            ->with('success', 'Doente criado com sucesso.');
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

    public function edit(Doente $doente)
    {
        return Inertia::render('Doentes/Edit', [
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