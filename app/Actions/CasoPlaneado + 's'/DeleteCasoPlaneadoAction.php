<?php

namespace App\Actions\{CasoPlaneado}s;

use App\Models\CasoPlaneado;

class DeleteCasoPlaneadoAction
{
    public function handle(CasoPlaneado $model): void
    {
        $model->delete();
    }
}