<?php

namespace App\Services;

use App\Models\CasoEquipa;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CasoEquipaService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return CasoEquipa::query()
            ->latest()
            ->paginate($perPage);
    }
}