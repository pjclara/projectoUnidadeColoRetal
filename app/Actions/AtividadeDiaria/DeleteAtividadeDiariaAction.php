<?php

namespace App\Actions\{AtividadeDiaria}s;

use App\Models\AtividadeDiaria;

class DeleteAtividadeDiariaAction
{
    public function handle(AtividadeDiaria $model): void
    {
        $model->delete();
    }
}