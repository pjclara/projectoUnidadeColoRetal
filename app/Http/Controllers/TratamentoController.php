<?php

namespace App\Http\Controllers;

use App\Models\Tratamento;
use Illuminate\Http\Request;

class TratamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tratamentos = Tratamento::paginate(10);

        return inertia('Tratamentos/Index', [
            'tratamentos' => $tratamentos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Tratamentos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Tratamento $tratamento)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tratamento $tratamento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tratamento $tratamento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tratamento $tratamento)
    {
        //
    }
}
