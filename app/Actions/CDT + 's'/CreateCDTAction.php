<?php

namespace App\Actions\{CDT}s;

use App\Models\CDT;

class CreateCDTAction
{
    public function handle(array $data): CDT
    {
        return CDT::create($data);
    }
}