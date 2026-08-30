<?php

namespace App\Actions\{Seguimento}s;

use App\Models\Seguimento;

class DeleteSeguimentoAction
{
    public function handle(Seguimento $model): void
    {
        $model->delete();
    }
}