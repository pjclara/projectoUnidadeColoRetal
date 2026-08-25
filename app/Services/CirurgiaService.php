<?php

namespace App\Services;

use App\Models\Cirurgia;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CirurgiaService
{
    public function __construct(private readonly \App\Services\EncryptionService $encryptionService) {}
    
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Cirurgia::query()
            ->latest()
            ->paginate($perPage)->through(function ($item) {
                return [
                    'id' => $item->id,
                    'caso_planeado_id' => $item->caso_planeado_id,
                    'procedimento' => $item->procedimento,
                    'abordagem' => $item->abordagem,
                    'urgencia' => $item->urgencia,
                    'reto' => $item->reto,
                    'terc_inferior_reto' => $item->terc_inferior_reto,
                    'excisao_mesorrecto' => $item->excisao_mesorrecto,
                    'ressecao_curativa' => $item->ressecao_curativa,
                    'colostomia_definitiva' => $item->colostomia_definitiva,
                    'anastomose' => $item->anastomose,
                    'eras_id' => $item->eras_id,
                    'observacoes' => $item->observacoes,
                ];
            });
    }

    public function forEpisodio(int $episodioId): LengthAwarePaginator
    {
        return Cirurgia::query()
            ->where('episodio_id', $episodioId)
            ->latest()
            ->paginate(15);
    }
}