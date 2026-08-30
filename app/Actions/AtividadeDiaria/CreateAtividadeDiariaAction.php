<?php

namespace App\Actions\{AtividadeDiaria}s;

use App\Models\AtividadeDiaria;

class CreateAtividadeDiariaAction
{
    public function handle(array $data): AtividadeDiaria
    {
        return AtividadeDiaria::create($data);
    }
}