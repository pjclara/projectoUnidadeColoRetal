<?php

namespace App\Actions\Tratamento;


use App\Models\Tratamento;

class UpdateTratamentoAction
{
    public function handle(Tratamento $model, array $data): Tratamento
    {
        $model->update($data);

        return $model->refresh();
    }
}