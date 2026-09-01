<?php

namespace App\Services;

use App\Models\Sala;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SalaService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Sala::query()
            ->latest()
            ->paginate($perPage);
    }

    public function create(array $data): Sala
    {
        return Sala::create($data);
    }

    public function update(Sala $sala, array $data): Sala
    {
        $sala->update($data);
        return $sala;
    }

    public function delete(Sala $sala): void
    {
        $sala->delete();
    }
}