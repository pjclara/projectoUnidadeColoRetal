<?php

namespace App\Actions\{CasoPlaneado}s;

use App\Models\CasoPlaneado;

class CreateCasoPlaneadoAction
{
    public function handle(array $data): CasoPlaneado
    {
        return CasoPlaneado::create($data);
    }
}