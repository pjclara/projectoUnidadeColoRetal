<?php

namespace App\Services;

use App\Models\Doente;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class DoenteService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Doente::query()
            ->latest()
            ->paginate($perPage);
    }
}