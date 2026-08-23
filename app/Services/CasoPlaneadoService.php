<?php

namespace App\Services;

use App\Services\EncryptionService;

use App\Models\CasoPlaneado;
use App\ViewModels\EpisodioViewModel;
use App\ViewModels\SlotViewModel;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CasoPlaneadoService
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return CasoPlaneado::query()
            ->latest()
            ->paginate($perPage)->through(function (CasoPlaneado $casoPlaneado) {
                return [
                    'id' => $casoPlaneado->id,
                    'slot_id' => $casoPlaneado->slot_id,
                    'episodio_id' => $casoPlaneado->episodio_id,
                    'ordem' => $casoPlaneado->ordem,
                    'procedimento_previsto' => $casoPlaneado->procedimento_previsto,
                    'duracao_prevista_min' => $casoPlaneado->duracao_prevista_min,
                    'anestesia_apto' => $casoPlaneado->anestesia_apto,
                    'cama_destino' => $casoPlaneado->cama_destino,
                    'internamento_em' => $casoPlaneado->internamento_em->format('Y-m-d'),
                    'cirurgiao_id' => $casoPlaneado->cirurgiao_id,
                    'observacoes' => $casoPlaneado->observacoes,
                    'episodio' => $casoPlaneado->episodio ? new EpisodioViewModel($casoPlaneado->episodio, app(EncryptionService::class)) : null,
                    'slot' => $casoPlaneado->slot ? new SlotViewModel($casoPlaneado->slot) : null,
                ];
            });
    }

    public function forDoente(int $doenteId): LengthAwarePaginator
    {
        return CasoPlaneado::query()
            ->whereHas('episodio', function ($query) use ($doenteId) {
                $query->where('doente_id', $doenteId);
            })
            ->latest()
            ->paginate(15);
    }

    public function serializeCasoPlaneado(CasoPlaneado $casoPlaneado): array
    {
        return [
            'id' => $casoPlaneado->id,
            'slot_id' => $casoPlaneado->slot_id,
            'episodio_id' => $casoPlaneado->episodio_id,
            'ordem' => $casoPlaneado->ordem,
            'procedimento_previsto' => $casoPlaneado->procedimento_previsto,
            'duracao_prevista_min' => $casoPlaneado->duracao_prevista_min,
            'anestesia_apto' => $casoPlaneado->anestesia_apto,
            'cama_destino' => $casoPlaneado->cama_destino,
            'internamento_em' => $casoPlaneado->internamento_em,
            'cirurgiao_id' => $casoPlaneado->cirurgiao_id,
            'observacoes' => $casoPlaneado->observacoes,
            'episodio' => $casoPlaneado->episodio ? new EpisodioViewModel($casoPlaneado->episodio, app(EncryptionService::class)) : null,
            'slot' => $casoPlaneado->slot ? new SlotViewModel($casoPlaneado->slot) : null,
        ];
    }

    public function create(array $data): CasoPlaneado
    {
        return CasoPlaneado::create($data);
    }

    public function update(CasoPlaneado $casoPlaneado, array $data): CasoPlaneado
    {
        $casoPlaneado->update($data);
        return $casoPlaneado;
    }
}