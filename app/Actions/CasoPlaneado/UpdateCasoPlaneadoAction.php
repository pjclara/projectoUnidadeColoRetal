<?php

namespace App\Actions\{CasoPlaneado}s;

use App\Models\CasoPlaneado;

class UpdateCasoPlaneadoAction
{
    public function handle(CasoPlaneado $model, array $data): CasoPlaneado
    {
        $model->update($data);

        return $model->refresh();
    }
}