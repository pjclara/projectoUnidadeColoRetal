<?php

namespace App\Services;

use App\Models\Episodio;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EpisodioService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Episodio::query()
            ->latest()
            ->paginate($perPage);
    }
}