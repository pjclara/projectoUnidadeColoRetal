<?php

namespace App\Actions\{Episodio}s;

use App\Models\Episodio;

class DeleteEpisodioAction
{
    public function handle(Episodio $model): void
    {
        $model->delete();
    }
}