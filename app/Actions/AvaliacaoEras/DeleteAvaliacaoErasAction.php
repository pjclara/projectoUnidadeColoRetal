<?php

namespace App\Actions\{AvaliacaoEras}s;

use App\Models\AvaliacaoEras;

class DeleteAvaliacaoErasAction
{
    public function handle(AvaliacaoEras $model): void
    {
        $model->delete();
    }
}