<?php

namespace App\Services;

use App\Models\Seguimento;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SeguimentoService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Seguimento::query()
            ->with('episodio.doente')
            ->latest('data_avaliacao')
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn (Seguimento $seguimento) => [
                'id' => $seguimento->id,
                'episodio_id' => $seguimento->episodio_id,
                'episodio' => $seguimento->episodio?->diagnostico ?? $seguimento->episodio?->motivo,
                'data_avaliacao' => $seguimento->data_avaliacao?->format('Y-m-d'),
                'recidiva_local' => $seguimento->recidiva_local,
                'estado_vital' => $seguimento->estado_vital,
                'readmissao' => $seguimento->readmissao,
                'reoperacao' => $seguimento->reoperacao,
                'observacoes' => $seguimento->observacoes,
            ]);
    }

    public function create(array $data): Seguimento
    {
        return Seguimento::create($data);
    }

    public function update(Seguimento $seguimento, array $data): bool
    {
        return $seguimento->update($data);
    }

    public function delete(Seguimento $seguimento): bool
    {
        return $seguimento->delete();
    }
}