<?php

namespace App\Actions\{Episodio}s;

use App\Models\Episodio;

class UpdateEpisodioAction
{
    public function handle(Episodio $model, array $data): Episodio
    {
        $model->update($data);

        return $model->refresh();
    }
}