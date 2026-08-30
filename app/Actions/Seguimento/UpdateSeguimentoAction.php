<?php

namespace App\Actions\{Seguimento}s;

use App\Models\Seguimento;

class UpdateSeguimentoAction
{
    public function handle(Seguimento $model, array $data): Seguimento
    {
        $model->update($data);

        return $model->refresh();
    }
}