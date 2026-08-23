<?php

namespace App\ViewModels;

use App\Models\Slot;

class SlotViewModel
{
    public function __construct(
        protected Slot $model
    ) {}

    public function toArray(): array
    {
        return [
            'id' => $this->model->id,
            'semana_id' => $this->model->semana_id,
            'polo' => $this->model->polo,
            'data' => $this->model->data,
            'sala_id' => $this->model->sala_id,
            'periodo' => $this->model->periodo,
            'modalidade' => $this->model->modalidade,
            'hora_inicio' => $this->model->hora_inicio,
            'hora_fim_prevista' => $this->model->hora_fim_prevista,
            'estado' => $this->model->estado,
            'origem' => $this->model->origem,
            'observacoes' => $this->model->observacoes,
            'created_at' => $this->model->created_at?->toISOString(),
            'updated_at' => $this->model->updated_at?->toISOString(),
        ];
    }
}