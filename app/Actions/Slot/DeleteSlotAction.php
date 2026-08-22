<?php

namespace App\Actions\{Slot}s;

use App\Models\Slot;

class DeleteSlotAction
{
    public function handle(Slot $model): void
    {
        $model->delete();
    }
}