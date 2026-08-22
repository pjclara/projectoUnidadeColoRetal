<?php

namespace App\Actions\{Slot}s;

use App\Models\Slot;

class UpdateSlotAction
{
    public function handle(Slot $model, array $data): Slot
    {
        $model->update($data);

        return $model->refresh();
    }
}