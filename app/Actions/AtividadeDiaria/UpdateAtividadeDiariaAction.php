<?php

namespace App\Actions\{AtividadeDiaria}s;

use App\Models\AtividadeDiaria;

class UpdateAtividadeDiariaAction
{
    public function handle(AtividadeDiaria $model, array $data): AtividadeDiaria
    {
        $model->update($data);

        return $model->refresh();
    }
}