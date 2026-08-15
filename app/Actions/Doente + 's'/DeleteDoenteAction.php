<?php

namespace App\Actions\{Doente}s;

use App\Models\Doente;

class DeleteDoenteAction
{
    public function handle(Doente $model): void
    {
        $model->delete();
    }
}