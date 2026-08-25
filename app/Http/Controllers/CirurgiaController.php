<?php

namespace App\Http\Controllers;

use App\Enums\PoloEnum;
use App\Http\Controllers\Controller;
use App\Models\AvaliacaoEras;
use App\Models\Cirurgia;
use App\Models\Doente;
use App\Models\Episodio;
use App\Models\User;
use App\Services\CirurgiaService;
use App\Services\DoenteService;
use App\Services\EncryptionService;
use App\Services\EpisodioService;
use App\ViewModels\CirurgiaViewModel;
use App\ViewModels\DoenteViewModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CirurgiaController extends Controller
{
    public function __construct(
        private CirurgiaService $service,
        private DoenteService $doenteService,
        private EpisodioService $episodioService,
        private EncryptionService $encryptionService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cirurgias = $this->service->paginate();

        return Inertia::render('Cirurgias/Index', [

            'cirurgias' => $cirurgias,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function create(Request $request)
    {
        $doenteId = $request->integer('doente_id') ?: null;

        $doentes = $this->doenteService->search(
            $request->only(['search', 'pu', 'nome', 'data_nascimento']),
        );

        $doente = $doenteId ? Doente::find($doenteId) : null;

        return Inertia::render('Cirurgias/Create', [
            'doentes' => $doentes,

            'selectedDoente' => $doente
                ? (new DoenteViewModel($doente, $this->encryptionService))->toArray()
                : null,

            'episodios' => fn() => $doente
                ? $this->episodioService->forDoente($doente->id)
                ->through(fn(Episodio $episodio) => $this->episodioService->serializeEpisodio($episodio))
                : null,

            'cirurgias' => fn() => $request->integer('episodio_id')
                ? $this->service->forEpisodio($request->integer('episodio_id'))
                ->through(fn(Cirurgia $cirurgia) => (new CirurgiaViewModel($cirurgia))->toArray())
                : null,
            'users' => User::query()->select('id', 'name')->orderBy('name')->get(),

            'poloOptions' => PoloEnum::options(),

            'filters' => $request->only(['search', 'pu', 'nome', 'data_nascimento']),
        ]);
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
    public function show(Cirurgia $cirurgia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cirurgia $cirurgia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cirurgia $cirurgia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cirurgia $cirurgia)
    {
        //
    }
}
