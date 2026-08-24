<?php

namespace App\Http\Controllers;

use App\Enums\PoloEnum;
use App\ViewModels\DoenteViewModel;
use App\Http\Controllers\Controller;
use App\Models\AvaliacaoEras;
use App\Models\Doente;
use App\Models\Episodio;
use App\Models\User;
use App\Services\AvaliacaoErasService;
use App\Services\DoenteService;
use App\Services\EncryptionService;
use App\Services\EpisodioService;
use App\Http\Requests\StoreAvaliacaoErasRequest;
use App\Http\Requests\UpdateAvaliacaoErasRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AvaliacaoErasController extends Controller
{
    public function __construct(
        private AvaliacaoErasService $service,
        private DoenteService $doenteService,
        private EpisodioService $episodioService,
        private EncryptionService $encryptionService,
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $avaliacoes = $this->service->paginate();

        return Inertia('AvaliacaoEras/Index', [
            'avaliacoes' => $avaliacoes,
            'poloOptions' => PoloEnum::options(),
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

        return Inertia::render('AvaliacaoEras/Create', [
            'doentes' => $doentes,

            'selectedDoente' => $doente
                ? (new DoenteViewModel($doente, $this->encryptionService))->toArray()
                : null,

            'episodios' => fn() => $doente
                ? $this->episodioService->forDoente($doente->id)
                ->through(fn(Episodio $episodio) => $this->episodioService->serializeEpisodio($episodio))
                : null,

            'avaliacaoEras' => $doente
                ? $this->service->forDoente($doente->id)
                ->through(fn(AvaliacaoEras $avaliacao) => $this->service->serializeAvaliacaoEras($avaliacao))
                : null,

            'users' => User::query()->select('id', 'name')->orderBy('name')->get(),

            'poloOptions' => PoloEnum::options(),

            'filters' => $request->only(['search', 'pu', 'nome', 'data_nascimento']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAvaliacaoErasRequest $request)
    {
        $avaliacaoEras = $this->service->create($request->validated());

        return redirect()->route('avaliacao-eras.create', ['doente_id' => $avaliacaoEras->episodio->doente_id])
            ->with('success', 'Avaliação ERAS criada com sucesso.');
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
    public function update(UpdateAvaliacaoErasRequest $request, AvaliacaoEras $avaliacaoEras)
    {
        $this->service->update($avaliacaoEras, $request->validated());

        return redirect()->route('avaliacao-eras.create', ['doente_id' => $avaliacaoEras->episodio->doente_id])
            ->with('success', 'Avaliação ERAS atualizada com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AvaliacaoEras $avaliacaoEras)
    {
        //
    }
}
