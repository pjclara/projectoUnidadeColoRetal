<?php

namespace App\Actions\{Episodio}s;

use App\Models\Episodio;

class CreateEpisodioAction
{
    public function handle(array $data): Episodio
    {
        return Episodio::create($data);
    }
}