<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSalaRequest;
use App\Models\Sala;
use App\Http\Requests\UpdateSalaRequest;
use App\Services\SalaService;

class SalaController extends Controller
{
     public function __construct(
        private SalaService $service){}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $salas = $this->service->paginate();

        return inertia('Salas/Index', [
            'salas' => $salas,
            'poloOptions' => \App\Enums\PoloEnum::options(),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSalaRequest $request)
    {
        $sala = $this->service->create($request->validated());

        return back()
            ->with('success', 'Sala criada com sucesso.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSalaRequest $request, Sala $sala)
    {
        $sala = $this->service->update($sala, $request->validated());

        return back()
            ->with('success', 'Sala atualizada com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sala $sala)
    {
        $this->service->delete($sala);

        return back()
            ->with('success', 'Sala removida com sucesso.');
    }
}
