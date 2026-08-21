<?php

namespace App\Actions\Sala;


use App\Models\Sala;

class UpdateSalaAction
{
    public function handle(Sala $model, array $data): Sala
    {
        $model->update($data);

        return $model->refresh();
    }
}