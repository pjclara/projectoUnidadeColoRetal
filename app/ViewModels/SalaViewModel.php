<?php

namespace App\ViewModels;

use App\Models\Sala;

class SalaViewModel
{
    public function __construct(
        protected Sala $model
    ) {}

    public function toArray(): array
    {
        return [
            'id' => $this->model->id,
            'created_at' => $this->model->created_at?->toISOString(),
            'updated_at' => $this->model->updated_at?->toISOString(),
        ];
    }
}