<?php

namespace App\Http\Controllers;

use App\Enums\PeriodoEnum;
use App\Enums\PoloEnum;
use App\Enums\TipoActividadeDiariaEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAtividadeDiariaRequest;
use App\Http\Requests\UpdateAtividadeDiariaRequest;
use App\Models\AtividadeDiaria;
use App\Models\User;
use App\Services\AtividadeDiariaService;
use Illuminate\Http\Request;

class AtividadeDiariaController extends Controller
{
    public function __construct(private AtividadeDiariaService $service) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $atividadeDiarias = $this->service->paginate(10);

        return inertia('AtividadeDiarias/Index', [
            'atividadeDiarias' => $atividadeDiarias,
            'poloOptions' => PoloEnum::options(),
            'userOptions' => User::query()->select('id', 'name')->orderBy('name')->get(),
            'periodoOptions' => PeriodoEnum::options(),
            'tipoOptions' => TipoActividadeDiariaEnum::options(),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAtividadeDiariaRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('atividade-diarias.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(AtividadeDiaria $atividadeDiaria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAtividadeDiariaRequest $request, AtividadeDiaria $atividadeDiaria)
    {
        $this->service->update($atividadeDiaria, $request->validated());
        return redirect()->route('atividade-diarias.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AtividadeDiaria $atividadeDiaria)
    {
        $this->service->delete($atividadeDiaria);
        return redirect()->route('atividade-diarias.index');
    }
}
