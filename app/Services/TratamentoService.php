<?php

namespace App\Services;

use App\Models\Tratamento;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TratamentoService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Tratamento::query()
            ->latest()
            ->paginate($perPage);
    }
}