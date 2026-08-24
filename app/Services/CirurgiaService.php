<?php

namespace App\Services;

use App\Models\Cirurgia;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CirurgiaService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Cirurgia::query()
            ->latest()
            ->paginate($perPage);
    }
}