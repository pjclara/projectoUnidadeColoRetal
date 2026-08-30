<?php

namespace App\Actions\{Seguimento}s;

use App\Models\Seguimento;

class CreateSeguimentoAction
{
    public function handle(array $data): Seguimento
    {
        return Seguimento::create($data);
    }
}