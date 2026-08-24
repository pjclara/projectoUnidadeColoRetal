<?php

namespace App\Actions\{Cirurgia}s;

use App\Models\Cirurgia;

class UpdateCirurgiaAction
{
    public function handle(Cirurgia $model, array $data): Cirurgia
    {
        $model->update($data);

        return $model->refresh();
    }
}