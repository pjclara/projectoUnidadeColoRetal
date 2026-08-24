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
            'created_at' => $this->model->created_at?->toISOString(),
            'updated_at' => $this->model->updated_at?->toISOString(),
        ];
    }
}