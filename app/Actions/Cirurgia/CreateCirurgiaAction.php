<?php

namespace App\Actions\{Cirurgia}s;

use App\Models\Cirurgia;

class CreateCirurgiaAction
{
    public function handle(array $data): Cirurgia
    {
        return Cirurgia::create($data);
    }
}