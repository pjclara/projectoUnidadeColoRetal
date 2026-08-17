<?php

namespace App\Actions\{CasoEquipa}s;

use App\Models\CasoEquipa;

class DeleteCasoEquipaAction
{
    public function handle(CasoEquipa $model): void
    {
        $model->delete();
    }
}