<?php

namespace App\Actions\{AvaliacaoEras}s;

use App\Models\AvaliacaoEras;

class UpdateAvaliacaoErasAction
{
    public function handle(AvaliacaoEras $model, array $data): AvaliacaoEras
    {
        $model->update($data);

        return $model->refresh();
    }
}