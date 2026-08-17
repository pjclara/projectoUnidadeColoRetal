<?php

namespace App\Actions\{CDT}s;

use App\Models\CDT;

class DeleteCDTAction
{
    public function handle(CDT $model): void
    {
        $model->delete();
    }
}