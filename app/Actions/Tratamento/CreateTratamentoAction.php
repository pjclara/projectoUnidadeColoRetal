<?php

namespace App\Actions\Tratamento;

use App\Models\Tratamento;

class CreateTratamentoAction
{
    public function handle(array $data): Tratamento
    {
        return Tratamento::create($data);
    }
}