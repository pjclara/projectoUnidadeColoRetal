<?php

namespace App\Http\Controllers;

use App\Enums\PoloEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCirurgiaRequest;
use App\Http\Requests\UpdateCirurgiaRequest;
use App\Models\CasoPlaneado;
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

            'casosPlaneados' => $doente
                ? CasoPlaneado::query()
                    ->whereHas('episodio', fn ($query) => $query->where('doente_id', $doente->id))
                    ->orderByDesc('id')
                    ->get(['id', 'episodio_id', 'ordem', 'procedimento_previsto'])
                    ->map(fn (CasoPlaneado $casoPlaneado) => [
                        'id' => $casoPlaneado->id,
                        'episodio_id' => $casoPlaneado->episodio_id,
                        'ordem' => $casoPlaneado->ordem,
                        'procedimento_previsto' => $casoPlaneado->procedimento_previsto,
                    ])
                : [],
            'users' => User::query()->select('id', 'name')->orderBy('name')->get(),

            'poloOptions' => PoloEnum::options(),

            'filters' => $request->only(['search', 'pu', 'nome', 'data_nascimento']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCirurgiaRequest $request)
    {
        $cirurgia = $this->service->create($request->validated());

        return back()
            ->with('success', 'Cirurgia criada com sucesso.')
            ->with('created_cirurgia', (new CirurgiaViewModel($cirurgia))->toArray());
    }

    /**
     * Display the specified resource.
     */
    public function show(Cirurgia $cirurgia)
    {
        return Inertia::render('Cirurgias/Show', [
            'cirurgia' => (new CirurgiaViewModel($cirurgia))->toArray(),
        ]);
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
    public function update(UpdateCirurgiaRequest $request, Cirurgia $cirurgia)
    {
        $cirurgia = $this->service->update($cirurgia, $request->validated());

        return back()
            ->with('success', 'Cirurgia atualizada com sucesso.')
            ->with('updated_cirurgia', (new CirurgiaViewModel($cirurgia))->toArray());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cirurgia $cirurgia)
    {
        $this->service->delete($cirurgia);

        return redirect()->route('cirurgias.index')
            ->with('success', 'Cirurgia eliminada com sucesso.');
    }
}
