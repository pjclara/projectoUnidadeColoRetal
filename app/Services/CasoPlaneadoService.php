<?php

namespace App\Services;

use App\Models\CasoPlaneado;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CasoPlaneadoService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return CasoPlaneado::query()
            ->latest()
            ->paginate($perPage);
    }
}