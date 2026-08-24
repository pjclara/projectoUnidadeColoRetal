<?php

namespace App\Http\Controllers;

use App\Models\AvaliacaoEras;
use Illuminate\Http\Request;
use App\Services\AvaliacaoErasService;
use Inertia\Inertia;

class AvaliacaoErasController extends Controller
{
    public function __construct(private AvaliacaoErasService $service) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $avaliacoes = $this->service->paginate();

        return Inertia('AvaliacaoEras/Index', [
            'avaliacoes' => $avaliacoes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(AvaliacaoEras $avaliacaoEras)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AvaliacaoEras $avaliacaoEras)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AvaliacaoEras $avaliacaoEras)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AvaliacaoEras $avaliacaoEras)
    {
        //
    }
}
