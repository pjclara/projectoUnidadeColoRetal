<?php

namespace App\Actions\Tratamento;


use App\Models\Tratamento;

class DeleteTratamentoAction
{
    public function handle(Tratamento $model): void
    {
        $model->delete();
    }
}