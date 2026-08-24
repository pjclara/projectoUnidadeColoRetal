<?php

namespace App\Actions\{Cirurgia}s;

use App\Models\Cirurgia;

class DeleteCirurgiaAction
{
    public function handle(Cirurgia $model): void
    {
        $model->delete();
    }
}