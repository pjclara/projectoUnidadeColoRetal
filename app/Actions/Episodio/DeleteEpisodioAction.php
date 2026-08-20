<?php

namespace App\Actions\Episodio;


use App\Models\Episodio;

class DeleteEpisodioAction
{
    public function handle(Episodio $model): void
    {
        $model->delete();
    }
}