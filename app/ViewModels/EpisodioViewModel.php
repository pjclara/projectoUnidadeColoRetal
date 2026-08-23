<?php

namespace App\ViewModels;

use App\Models\Episodio;
use App\Services\EncryptionService;
use App\ViewModels\DoenteViewModel;

class EpisodioViewModel 
{
    public function __construct(
        protected Episodio $model,
        protected EncryptionService $encryption,
    ) {}

    public function toArray(): array
    {
        return [
            'id' => $this->model->id,
            'doente' => $this->model->doente ? new DoenteViewModel($this->model->doente, $this->encryption) : null,
            'motivo' => $this->model->motivo,
            'tipo' => $this->model->tipo,
            'diagnostico' => $this->model->diagnostico,
            'cid10' => $this->model->cid10,
            'data_diagnostico' => $this->model->data_diagnostico,
            'centro_referencia' => $this->model->centro_referencia,
            'pai_entrada' => $this->model->pai_entrada,
            'pai_saida' => $this->model->pai_saida,
            'motivo_saida' => $this->model->motivo_saida,
            'user_id' => $this->model->user_id,
            'estado' => $this->model->estado,
            'observacoes' => $this->model->observacoes,

        ];
    }
}