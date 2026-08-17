<?php

namespace App\Services;

use App\Models\CDT;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CDTService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return CDT::query()
            ->latest()
            ->paginate($perPage);
    }
}