<?php

namespace App\Services;

use App\Models\AtividadeDiaria;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class AtividadeDiariaService
{
    /** @return Collection<int, array<string, mixed>> */
    public function forMonth(string $month): Collection
    {
        return $this->activitiesBetween("{$month}-01", Carbon::createFromFormat('Y-m', $month)->endOfMonth()->toDateString());
    }

    /** @return Collection<int, array<string, mixed>> */
    public function forWeek(string $week): Collection
    {
        return $this->activitiesBetween($week, Carbon::parse($week)->endOfWeek()->toDateString());
    }

    /** @return Collection<int, array<string, mixed>> */
    private function activitiesBetween(string $startDate, string $endDate): Collection
    {
        return AtividadeDiaria::query()
            ->with('user:id,name,abreviatura')
            ->whereBetween('data', [$startDate, $endDate])
            ->orderBy('data')
            ->orderBy('tipo')
            ->orderBy('periodo')
            ->get()
            ->map(fn (AtividadeDiaria $item) => [
                'id' => $item->id,
                'polo' => $item->polo?->value,
                'user' => $item->user?->abreviatura,
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
                'user' => $item->user?->abreviatura ?? null,
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