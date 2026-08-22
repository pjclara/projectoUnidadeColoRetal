<?php

namespace App\Actions\{Slot}s;

use App\Models\Slot;

class CreateSlotAction
{
    public function handle(array $data): Slot
    {
        return Slot::create($data);
    }
}