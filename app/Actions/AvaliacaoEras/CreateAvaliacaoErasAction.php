<?php

namespace App\Actions\{AvaliacaoEras}s;

use App\Models\AvaliacaoEras;

class CreateAvaliacaoErasAction
{
    public function handle(array $data): AvaliacaoEras
    {
        return AvaliacaoEras::create($data);
    }
}