<?php

namespace App\Services;

use App\Models\AvaliacaoEras;
use App\ViewModels\DoenteViewModel;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AvaliacaoErasService
{
    public function __construct(private readonly \App\Services\EncryptionService $encryptionService) {}
    
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return AvaliacaoEras::query()
            ->latest()
            ->paginate($perPage)->through(function ($slot) {
                return [
                    'id' => $slot->id,
                    'episodio_id' => $slot->episodio_id,
                    'data_consulta' => $slot->data_consulta->format('Y-m-d'),
                    'aptidao' => $slot->aptidao,
                    'asa' => $slot->asa,
                    'polo_recomendado' => $slot->polo_recomendado,
                    'mfr' => $slot->mfr,
                    'dias_prehabilitacao' => $slot->dias_prehabilitacao,
                    'notas' => $slot->notas,
                    'fonte' => $slot->fonte,
                    'doente' => $slot->episodio?->doente
                        ? (new DoenteViewModel($slot->episodio->doente, $this->encryptionService))->toArray()
                        : null,

                    'episodio' => $slot->episodio
                        ? [
                            'id' => $slot->episodio->id,
                            'data_entrada' => $slot->episodio->data_entrada?->format('Y-m-d'),
                            'data_saida' => $slot->episodio->data_saida?->format('Y-m-d'),
                        ]
                        : null,
                ];
            });
    }

    public function forDoente(int $doenteId): LengthAwarePaginator
    {
        return AvaliacaoEras::query()
            ->whereHas('episodio', function ($query) use ($doenteId) {
                $query->where('doente_id', $doenteId);
            })
            ->latest()
            ->paginate(15);
    }

    public function serializeAvaliacaoEras(AvaliacaoEras $avaliacao): array
    {
        return [
            'id' => $avaliacao->id,
            'episodio_id' => $avaliacao->episodio_id,
            'data_consulta' => $avaliacao->data_consulta->format('Y-m-d'),
            'aptidao' => $avaliacao->aptidao,
            'asa' => $avaliacao->asa,
            'polo_recomendado' => $avaliacao->polo_recomendado,
            'mfr' => $avaliacao->mfr,
            'dias_prehabilitacao' => $avaliacao->dias_prehabilitacao,
            'notas' => $avaliacao->notas,
            'fonte' => $avaliacao->fonte,
        ];
    }

    public function create(array $data): AvaliacaoEras
    {
        return AvaliacaoEras::create($data);
    }

    public function update(AvaliacaoEras $avaliacao, array $data): AvaliacaoEras
    {
        $avaliacao->update($data);
        return $avaliacao;
    }
}