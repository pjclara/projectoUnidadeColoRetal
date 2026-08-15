<?php

namespace App\Actions\{Doente}s;

use App\Models\Doente;

class UpdateDoenteAction
{
    public function handle(Doente $model, array $data): Doente
    {
        $model->update($data);

        return $model->refresh();
    }
}