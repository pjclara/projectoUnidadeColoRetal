<?php

namespace App\Actions\{CasoEquipa}s;

use App\Models\CasoEquipa;

class UpdateCasoEquipaAction
{
    public function handle(CasoEquipa $model, array $data): CasoEquipa
    {
        $model->update($data);

        return $model->refresh();
    }
}