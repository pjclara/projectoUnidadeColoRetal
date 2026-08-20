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

    public function forDoente(int $doenteId, int $perPage = 10): LengthAwarePaginator
    {
        return Episodio::query()
            ->with('utilizador:id,name')
            ->where('doente_id', $doenteId)
            ->latest('data_episodio')
            ->latest('id')
            ->paginate($perPage, ['*'], 'episodios_page')
            ->withQueryString();
    }

    public function create(array $data, int $utilizadorId): Episodio
    {
        return Episodio::create([
            ...$data,
            'utilizador_id' => $utilizadorId,
        ]);
    }

    public function update(Episodio $episodio, array $data): Episodio
    {
        $episodio->update($data);

        return $episodio->refresh();
    }
}
