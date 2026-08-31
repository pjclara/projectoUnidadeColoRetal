<?php

namespace App\ViewModels;

use App\Models\Cirurgia;

class CirurgiaViewModel
{
    public function __construct(
        protected Cirurgia $model
    ) {}

    public function toArray(): array
    {
        return [
            'id' => $this->model->id,
            'caso_planeado_id' => $this->model->caso_planeado_id,
            'procedimento' => $this->model->procedimento,
            'abordagem' => $this->model->abordagem,
            'urgencia' => $this->model->urgencia,
            'reto' => $this->model->reto,
            'terc_inferior_reto' => $this->model->terc_inferior_reto,
            'excisao_mesorrecto' => $this->model->excisao_mesorrecto,
            'ressecao_curativa' => $this->model->ressecao_curativa,
            'colostomia_definitiva' => $this->model->colostomia_definitiva,
            'anastomose' => $this->model->anastomose,
            'eras_id' => $this->model->eras_id,
            'observacoes' => $this->model->observacoes,
            'created_at' => $this->model->created_at?->toISOString(),
            'updated_at' => $this->model->updated_at?->toISOString(),
        ];
    }
}