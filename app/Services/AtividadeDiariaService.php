<?php

namespace App\Services;

use App\Models\AtividadeDiaria;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class AtividadeDiariaService
{
    /** @return Collection<int, array<string, mixed>> */
    public function forMonth(string $month): Collection
    {
        return AtividadeDiaria::query()
            ->with('user:id,name')
            ->whereBetween('data', ["{$month}-01", now()->createFromFormat('Y-m', $month)->endOfMonth()->toDateString()])
            ->orderBy('data')
            ->orderBy('tipo')
            ->orderBy('periodo')
            ->get()
            ->map(fn (AtividadeDiaria $item) => [
                'id' => $item->id,
                'polo' => $item->polo?->value,
                'user' => $item->user?->name,
                'user_id' => $item->user_id,
                'periodo' => $item->periodo?->value,
                'detalhe' => $item->detalhe,
                'data' => $item->data->format('Y-m-d'),
                'tipo' => $item->tipo?->value,
                'fonte' => $item->fonte,
            ]);
    }

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