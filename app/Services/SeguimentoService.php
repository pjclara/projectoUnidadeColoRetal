<?php

namespace App\Services;

use App\Models\Seguimento;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SeguimentoService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Seguimento::query()
            ->latest()
            ->paginate($perPage);
    }
}