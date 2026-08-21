<?php

namespace App\Actions\Sala;


use App\Models\Sala;

class DeleteSalaAction
{
    public function handle(Sala $model): void
    {
        $model->delete();
    }
}