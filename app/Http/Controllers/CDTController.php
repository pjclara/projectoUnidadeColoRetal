<?php

namespace App\Http\Controllers;

use App\Actions\Doente\CreateDoenteAction;
use App\Http\Requests\StoreCDTRequest;
use App\Http\Requests\StoreDoenteRequest;
use App\Http\Requests\UpdateCDTRequest;
use App\Models\CDT;
use App\Models\Doente;
use App\Models\Episodio;
use App\Models\User;
use App\Services\CDTService;
use App\Services\DoenteService;
use App\Services\EncryptionService;
use App\Services\EpisodioService;
use App\ViewModels\DoenteViewModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CDTController extends Controller
{
    public function __construct(
        private CDTService $service,
        private DoenteService $doenteService,
        private EpisodioService $episodioService,
        private EncryptionService $encryptionService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cdts = $this->service->paginate();

        return Inertia::render('CDTS/Index', [
            'cdts' => $cdts,
        ]);
    }

    /**
     * Show the Wizard for creating a new resource.
     */
    public function create(Request $request)
    {
        $doenteId = $request->integer('doente_id') ?: null;

        $doentes = $this->doenteService->search(
            $request->only(['search', 'pu', 'nome', 'data_nascimento']),
        );

        $doente = $doenteId ? Doente::find($doenteId) : null;

        return Inertia::render('CDTS/Create', [
            'doentes' => $doentes,

            'selectedDoente' => $doente
                ? (new DoenteViewModel($doente, $this->encryptionService))->toArray()
                : null,

            'episodios' => fn () => $doente
                ? $this->episodioService->forDoente($doente->id)
                    ->through(fn (Episodio $episodio) => $this->serializeEpisodio($episodio))
                : null,

            'users' => User::query()->select('id', 'name')->orderBy('name')->get(),

            'filters' => $request->only(['search', 'pu', 'nome', 'data_nascimento']),
        ]);
    }

    /**
     * Cria um doente sem sair do Wizard de CDT, devolvendo-o via flash.
     */
    public function storeDoente(StoreDoenteRequest $request, CreateDoenteAction $action)
    {
        $doente = $action->execute($request->validated());

        return back()
            ->with('success', 'Doente criado com sucesso.')
            ->with('created_doente', (new DoenteViewModel($doente, $this->encryptionService))->toArray());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCDTRequest $request)
    {
        $cdt = $this->service->create($request->validated());

        return back()
            ->with('success', 'CDT criada com sucesso.')
            ->with('created_cdt', [
                'id' => $cdt->id,
                'episodio_id' => $cdt->episodio_id,
                'data_pedido' => $cdt->data_pedido?->format('Y-m-d'),
                'data_discussao' => $cdt->data_discussao?->format('Y-m-d'),
                'decisao' => $cdt->decisao,
                'estadio_clinico' => $cdt->estadio_clinico,
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CDT $cDT)
    {
        $cDT->load('episodio.doente');

        return Inertia::render('CDTS/Show', [
            'cdt' => [
                'id' => $cDT->id,
                'data_pedido' => $cDT->data_pedido?->format('Y-m-d'),
                'data_discussao' => $cDT->data_discussao?->format('Y-m-d'),
                'decisao' => $cDT->decisao,
                'estadio_clinico' => $cDT->estadio_clinico,

                'episodio' => $this->serializeEpisodio($cDT->episodio),

                'doente' => $cDT->episodio->doente
                    ? (new DoenteViewModel($cDT->episodio->doente, $this->encryptionService))->toArray()
                    : null,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CDT $cDT)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCDTRequest $request, CDT $cDT)
    {
        $this->service->update($cDT, $request->validated());

        return back()
            ->with('success', 'CDT atualizada com sucesso.');    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CDT $cDT)
    {
        $this->service->delete($cDT);

        return redirect()->route('cdts.index')
            ->with('success', 'CDT eliminada com sucesso.');
    }

    private function serializeEpisodio(Episodio $episodio): array
    {
        return [
            'id' => $episodio->id,
            'doente_id' => $episodio->doente_id,
            'tipo' => $episodio->tipo,
            'diagnostico' => $episodio->diagnostico,
            'cid10' => $episodio->cid10,
            'data_diagnostico' => $episodio->data_diagnostico?->format('Y-m-d'),
            'estado' => $episodio->estado,
            'cdts' => $episodio->cdts->map(function ($cdt) {
                return [
                    'id' => $cdt->id,
                    'data_pedido' => $cdt->data_pedido?->format('Y-m-d'),
                    'data_discussao' => $cdt->data_discussao?->format('Y-m-d'),
                    'decisao' => $cdt->decisao,
                    'estadio_clinico' => $cdt->estadio_clinico,
                ];
            }),
        ];
    }
}

