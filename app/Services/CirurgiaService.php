<?php

namespace App\Services;

use App\Models\Cirurgia;
use App\ViewModels\DoenteViewModel;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CirurgiaService
{
    public function __construct(private readonly \App\Services\EncryptionService $encryptionService) {}
    
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Cirurgia::query()
            ->with('casoPlaneado.episodio.doente')
            ->latest()
            ->paginate($perPage)->through(function ($item) {
                return [
                    'id' => $item->id,
                    'caso_planeado_id' => $item->caso_planeado_id,
                    'doente' => $item->casoPlaneado?->episodio?->doente
                        ? (new DoenteViewModel($item->casoPlaneado->episodio->doente, $this->encryptionService))->toArray()
                        : null,
                    'episodio' => $item->casoPlaneado?->episodio
                        ? [
                            'id' => $item->casoPlaneado->episodio->id,
                            'diagnostico' => $item->casoPlaneado->episodio->diagnostico,
                        ]
                        : null,
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
            ->whereHas('casoPlaneado', fn ($query) => $query->where('episodio_id', $episodioId))
            ->latest()
            ->paginate(15);
    }

    public function create(array $data): Cirurgia
    {
        return Cirurgia::create($data);
    }

    public function update(Cirurgia $cirurgia, array $data): Cirurgia
    {
        $cirurgia->update($data);

        return $cirurgia->refresh();
    }

    public function delete(Cirurgia $cirurgia): bool
    {
        return $cirurgia->delete();
    }
}