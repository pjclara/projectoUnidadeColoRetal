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
use Illuminate\Validation\Rule;

class AtividadeDiariaController extends Controller
{
    public function __construct(private AtividadeDiariaService $service) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->validate([
            'view' => ['nullable', Rule::in(['week', 'month'])],
            'week' => ['nullable', 'date_format:Y-m-d'],
            'month' => ['nullable', 'date_format:Y-m'],
        ]);

        

        $view = $request->string('view')->toString() ?: 'week';
        $week = $request->date('week')?->startOfWeek()->toDateString() ?? now()->startOfWeek()->toDateString();
        $month = $request->string('month')->toString() ?: now()->format('Y-m');
        $atividadeDiarias = $view === 'month' ? $this->service->forMonth($month) : $this->service->forWeek($week);

        return inertia('AtividadeDiarias/Index', [
            'atividadeDiarias' => $atividadeDiarias,
            'viewMode' => $view,
            'selectedWeek' => $week,
            'selectedMonth' => $month,
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
        return back();
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
        return back();
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
