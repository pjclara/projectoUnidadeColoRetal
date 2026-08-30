<?php

namespace App\Services;

use App\Models\AtividadeDiaria;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AtividadeDiariaService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return AtividadeDiaria::query()
            ->orderBy('data', 'asc')
            ->paginate($perPage)
            ->withQueryString()->through(fn ($item) => [
                'id' => $item->id,
                'polo' => $item->polo,
                'user' => $item->user?->name ?? null,
                'user_id' => $item->user_id,
                'periodo' => $item->periodo,
                'detalhe' => $item->detalhe,
                'data' => $item->data->format('Y-m-d'),
                'tipo' => $item->tipo,
                'fonte' => $item->fonte,
            ]);
    }

    public function create(array $data): AtividadeDiaria
    {
        return AtividadeDiaria::create($data);
    }

    public function update(AtividadeDiaria $atividadeDiaria, array $data): bool
    {
        return $atividadeDiaria->update($data);
    }

    public function delete(AtividadeDiaria $atividadeDiaria): bool
    {
        return $atividadeDiaria->delete();
    }
}