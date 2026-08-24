<?php

namespace App\Http\Controllers;
use App\Enums\PeriodoEnum;
use App\Enums\ModalidadeEnum;
use App\Enums\PoloEnum;
use App\Enums\SlotEstadoEnum;
use App\Enums\SlotOrigemEnum;
use App\Http\Requests\StoreSlotRequest;
use App\Models\Slot;
use App\Services\SlotService;
use App\Http\Requests\UpdateSlotRequest;

class SlotController extends Controller
{
    public function __construct(
        private SlotService $service
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $slots = $this->service->paginate();
        $salas = $this->service->getSalas();

        return inertia(
            'Slots/Index',
            [
                'slots' => $slots,
                'salas' => $salas, 
                'estadoOptions' => SlotEstadoEnum::options(),
                'origemOptions' => SlotOrigemEnum::options(),
                'periodoOptions' => PeriodoEnum::options(),
                'modalidadeOptions' => ModalidadeEnum::options(),
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSlotRequest $request)
    {
        $this->service->create($request->validated());

        return redirect()->back()->with('success', 'Slot created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSlotRequest $request, Slot $slot)
    {
        $this->service->update($slot, $request->validated());

        return redirect()->back()->with('success', 'Slot updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Slot $slot)
    {
        $this->service->delete($slot);

        return redirect()->back()->with('success', 'Slot deleted successfully.');
    }
}
