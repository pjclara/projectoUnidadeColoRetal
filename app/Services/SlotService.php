<?php

namespace App\Services;

use App\Models\Sala;
use App\Models\Slot;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SlotService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Slot::query()
            ->latest()
            ->paginate($perPage)
            ->withQueryString()->through(function ($slot) {
                return [
                    'id' => $slot->id,
                    'semana_id' => $slot->semana_id,
                    'polo' => $slot->polo,
                    'data' => $slot->data->format('Y-m-d'),
                    'sala_id' => $slot->sala_id,
                    'periodo' => $slot->periodo,
                    'modalidade' => $slot->modalidade,
                    'hora_inicio' => $slot->hora_inicio->format('H:i'),
                    'hora_fim_prevista' => $slot->hora_fim_prevista->format('H:i'),
                    'estado' => $slot->estado,
                    'origem' => $slot->origem,
                    'observacoes' => $slot->observacoes,
                ];
            });
    }

    public function getSalas()
    {
        return Sala::query()
            ->select('id', 'polo', 'codigo')
            ->orderBy('polo')
            ->get();
    }

    public function all()
    {
        return Slot::query()
            ->latest()
            ->get();
    }

    public function create(array $data): Slot
    {
        return Slot::create($data);
    }

    public function update(Slot $slot, array $data): bool
    {
        return $slot->update($data);
    }


    public function delete(Slot $slot): bool
    {
        return $slot->delete();
    }
}
