<?php

namespace App\Actions\Sala;

use App\Models\Sala;

class CreateSalaAction
{
    public function handle(array $data): Sala
    {
        return Sala::create($data);
    }
}