<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSeguimentoRequest;
use App\Http\Requests\UpdateSeguimentoRequest;
use App\Models\Episodio;
use App\Models\Seguimento;
use App\Services\EncryptionService;
use App\Services\SeguimentoService;

class SeguimentoController extends Controller
{
    public function __construct(
        private SeguimentoService $service,
        private EncryptionService $encryptionService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Seguimentos/Index', [
            'seguimentos' => $this->service->paginate(10),
            'episodioOptions' => Episodio::query()
                ->with('doente:id,nome_cipher,nome_iv,nome_tag')
                ->select('id', 'doente_id', 'diagnostico')
                ->orderByDesc('id')
                ->get()
                ->map(fn (Episodio $episodio) => [
                    'value' => (string) $episodio->id,
                    'label' => sprintf(
                        '%s — %s',
                        $episodio->diagnostico ?? 'Sem diagnóstico',
                        $episodio->doente
                            ? $this->encryptionService->decrypt(
                                $episodio->doente->nome_cipher,
                                $episodio->doente->nome_iv,
                                $episodio->doente->nome_tag,
                            )
                            : 'Sem doente',
                    ),
                ]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSeguimentoRequest $request)
    {
        $this->service->create($request->validated());

        return redirect()->route('seguimentos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Seguimento $seguimento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSeguimentoRequest $request, Seguimento $seguimento)
    {
        $this->service->update($seguimento, $request->validated());

        return redirect()->route('seguimentos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seguimento $seguimento)
    {
        $this->service->delete($seguimento);

        return redirect()->route('seguimentos.index');
    }
}
