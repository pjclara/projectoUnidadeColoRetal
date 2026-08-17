<?php

namespace App\Actions\{CasoEquipa}s;

use App\Models\CasoEquipa;

class CreateCasoEquipaAction
{
    public function handle(array $data): CasoEquipa
    {
        return CasoEquipa::create($data);
    }
}