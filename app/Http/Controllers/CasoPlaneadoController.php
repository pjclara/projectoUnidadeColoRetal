<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\EncryptionService;
use App\Services\CasoPlaneadoService;
use App\Services\DoenteService;
use App\Models\Doente;
use App\ViewModels\DoenteViewModel;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCasoPlaneadoRequest;
use App\Http\Requests\UpdateCasoPlaneadoRequest;
use App\Services\EpisodioService;
use App\Models\Episodio;
use App\Models\User;
use App\Models\CasoPlaneado;
use App\Models\Slot;

class CasoPlaneadoController extends Controller
{
    public function __construct(
        private CasoPlaneadoService $service,
        private DoenteService $doenteService,
        private EncryptionService $encryptionService,
        private EpisodioService $episodioService,
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $casosPlaneados = $this->service->paginate();

        return Inertia('CasoPlaneados/Index', [
            'casosPlaneados' => $casosPlaneados,
            'users' => User::query()->select('id', 'name')->orderBy('name')->get(),
            'slots' => Slot::query()
                ->orderBy('data')
                ->orderBy('sala_id')
                ->orderBy('periodo')
                ->get()
                ->map(fn(Slot $slot) => [
                    'id' => $slot->id,
                    'nome_slot' => $slot->nome_slot,
                ]),
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

        return Inertia::render('CasoPlaneados/Create', [
            'doentes' => $doentes,
            'selectedDoente' => $doente
                ? (new DoenteViewModel($doente, $this->encryptionService))->toArray()
                : null,
            'episodios' => fn() => $doente
                ? $this->episodioService->forDoente($doente->id)
                ->through(fn(Episodio $episodio) => $this->episodioService->serializeEpisodio($episodio))
                : null,
            'casosPlaneados' => fn() => $doente
                ? $this->service->forDoente($doente->id)
                ->through(fn(CasoPlaneado $casoPlaneado) => $this->service->serializeCasoPlaneado($casoPlaneado))
                : null,
            'slots' => Slot::query()
                ->orderBy('data')
                ->orderBy('sala_id')
                ->orderBy('periodo')
                ->get()
                ->map(fn(Slot $slot) => [
                    'id' => $slot->id,
                    'nome_slot' => $slot->nome_slot,
                ]),
            'salas' => fn() => $this->service->getSalas(),

            'users' => User::query()->select('id', 'name')->orderBy('name')->get(),

            'filters' => $request->only(['search', 'pu', 'nome', 'data_nascimento']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCasoPlaneadoRequest $request)
    {
        $casoPlaneado = $this->service->create($request->validated());

        return redirect()->route('caso-planeados.index', ['doente_id' => $casoPlaneado->episodio->doente_id])
            ->with('success', 'Caso Planeado criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CasoPlaneado $casoPlaneado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CasoPlaneado $casoPlaneado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCasoPlaneadoRequest $request, CasoPlaneado $casoPlaneado)
    {
        $this->service->update($casoPlaneado, $request->validated());

        return redirect()->route('caso-planeados.index', ['doente_id' => $casoPlaneado->episodio->doente_id])
            ->with('success', 'Caso Planeado atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CasoPlaneado $casoPlaneado)
    {
        //
    }

    public function storeEquipaForCasoPlaneado(
        Request $request,
        CasoPlaneado $casoPlaneado
    ) {
        $data = $request->validate([
            'equipas' => ['array'],

            'equipas.*.user_id' => [
                'required',
                'integer',
                'exists:users,id',
            ],

            'equipas.*.funcao' => [
                'required',
                'string',
                'max:120',
            ],
        ]);

        $this->service->syncEquipaCasoPlaneado(
            $casoPlaneado,
            $data['equipas'] ?? []
        );

        return redirect()
            ->route('caso-planeados.index')
            ->with(
                'success',
                'Equipa do caso atualizada com sucesso.'
            );
    }
}
