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
                    'data_avaliacao' => $slot->data_avaliacao,
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
                ];
            });
    }
}