<?php

namespace App\Actions\CDT;

use App\Models\CDT;

class DeleteCDTAction
{
    public function handle(CDT $model): void
    {
        $model->delete();
    }
}