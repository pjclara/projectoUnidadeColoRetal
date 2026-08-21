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
            ->with('user:id,name')
            ->where('doente_id', $doenteId)
            ->latest('data_diagnostico')
            ->latest('id')
            ->paginate($perPage, ['*'], 'episodios_page')
            ->withQueryString();
    }

    public function create(array $data, int $userId): Episodio
    {
        return Episodio::create([
            ...$data,
            'user_id' => $userId,
        ]);
    }

    public function update(Episodio $episodio, array $data): Episodio
    {
        $episodio->update($data);

        return $episodio->refresh();
    }
    
    public function serializeEpisodio(Episodio $episodio): array
    {
        return [
            'id' => $episodio->id,
            'doente_id' => $episodio->doente_id,
            'tipo' => $episodio->tipo,
            'diagnostico' => $episodio->diagnostico,
            'cid10' => $episodio->cid10,
            'data_diagnostico' => $episodio->data_diagnostico?->format('Y-m-d'),
            'estado' => $episodio->estado,
        ];
    }
}
