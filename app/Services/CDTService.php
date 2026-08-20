<?php

namespace App\Services;

use App\Models\CDT;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CDTService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return CDT::query()
            ->latest('id')
            ->paginate($perPage);
    }

    public function create(array $data): CDT
    {
        return CDT::create($data);
    }

    public function update(CDT $cdt, array $data): CDT
    {
        $cdt->update($data);

        return $cdt->refresh();
    }
}