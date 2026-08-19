<?php

namespace App\Http\Controllers;

use App\Models\Doente;
use Inertia\Inertia;

class AtendimentoController extends Controller
{
    public function create()
    {
        return Inertia::render('atendimento/Novo', [
            'doentes' => [],
            'episodios' => [],
        ]);
    }
}