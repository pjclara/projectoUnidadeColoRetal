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
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSalaRequest $request)
    {
        $sala = $this->service->create($request->validated());

        return redirect()->route('salas.index')
            ->with('success', 'Sala criada com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Sala $sala)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sala $sala)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSalaRequest $request, Sala $sala)
    {
        $sala = $this->service->update($sala, $request->validated());

        return redirect()->route('salas.index')
            ->with('success', 'Sala atualizada com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sala $sala)
    {
        //
    }
}
