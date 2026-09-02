<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTratamentoRequest;
use App\Http\Requests\UpdateTratamentoRequest;
use App\Models\Tratamento;
use App\Models\Doente;
use App\Models\Episodio;
use App\Models\User;
use Inertia\Inertia;
use App\Services\TratamentoService;
use App\Services\DoenteService;
use App\Services\EpisodioService;
use App\Services\EncryptionService;
use App\ViewModels\DoenteViewModel;
use Illuminate\Http\Request;

class TratamentoController extends Controller
{
    public function __construct(
        private TratamentoService $service,
        private DoenteService $doenteService,
        private EpisodioService $episodioService,
        private EncryptionService $encryptionService,
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tratamentos = $this->service->paginate();

        return inertia('Tratamentos/Index', [
            'tratamentos' => $tratamentos,
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

        return Inertia::render('Tratamentos/Create', [
            'doentes' => $doentes,

            'selectedDoente' => $doente
                ? (new DoenteViewModel($doente, $this->encryptionService))->toArray()
                : null,

            'episodios' => fn() => $doente
                ? $this->episodioService->forDoente($doente->id)
                ->through(fn(Episodio $episodio) => $this->serializeEpisodio($episodio))
                : null,

            'users' => User::query()->select('id', 'name')->orderBy('name')->get(),

            'filters' => $request->only(['search', 'pu', 'nome', 'data_nascimento']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTratamentoRequest $request)
    {
        $tratamento = $this->service->create($request->validated());

        return back()
            ->with('success', 'Tratamento criado com sucesso.')
            ->with('created_tratamento', $this->serializeTratamento($tratamento));
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
    public function update(UpdateTratamentoRequest $request, Tratamento $tratamento)
    {
        $this->service->update($tratamento, $request->validated());

        return redirect()->route('tratamentos.index')
            ->with('success', 'Tratamento atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tratamento $tratamento)
    {
        $this->service->delete($tratamento);

        return redirect()->route('tratamentos.index')
            ->with('success', 'Tratamento eliminado com sucesso.');
    }

    private function serializeTratamento(Tratamento $tratamento): array
    {
        return [
            'id' => $tratamento->id,
            'episodio_id' => $tratamento->episodio_id,
            'tipo' => $tratamento->tipo,
            'data_proposta' => $tratamento->data_proposta?->format('Y-m-d'),
            'data_inicio' => $tratamento->data_inicio?->format('Y-m-d'),
            'data_fim' => $tratamento->data_fim?->format('Y-m-d'),
            'intencao' => $tratamento->intencao,
            'observacoes' => $tratamento->observacoes,
        ];
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
            'tratamentos' => $episodio->tratamentos->map(fn (Tratamento $tratamento) => $this->serializeTratamento($tratamento)),
        ];
    }
}
