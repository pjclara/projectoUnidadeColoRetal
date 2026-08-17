<?php

namespace App\Actions\{CDT}s;

use App\Models\CDT;

class UpdateCDTAction
{
    public function handle(CDT $model, array $data): CDT
    {
        $model->update($data);

        return $model->refresh();
    }
}