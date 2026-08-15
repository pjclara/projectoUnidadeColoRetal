<?php

namespace App\Actions\{Doente}s;

use App\Models\Doente;

class CreateDoenteAction
{
    public function handle(array $data): Doente
    {
        return Doente::create($data);
    }
}