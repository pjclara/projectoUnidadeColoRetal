<?php

namespace App\Services;

use App\Services\EncryptionService;
use App\ViewModels\DoenteViewModel;

use App\Models\CasoPlaneado;
use App\ViewModels\EpisodioViewModel;
use App\ViewModels\SlotViewModel;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

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
                    'doente' => $casoPlaneado->doente
                        ? (new DoenteViewModel($casoPlaneado->doente, app(EncryptionService::class)))->toArray()
                        : null,
                    'casos_equipas' => $casoPlaneado->casoEquipa
                        ? $casoPlaneado->casoEquipa->map(function ($casoEquipa) {
                            return [
                                'caso_planeado_id' => $casoEquipa->caso_planeado_id,
                                'user' => $casoEquipa->user->name ?? 'Unknown User',
                                'funcao' => $casoEquipa->funcao,
                            ];
                        })->toArray()
                        : null,
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

    public function delete(CasoPlaneado $casoPlaneado): void
    {
        $casoPlaneado->delete();
    }

    public function syncEquipaCasoPlaneado(
        CasoPlaneado $casoPlaneado,
        array $equipas
    ): void {
        DB::transaction(function () use ($casoPlaneado, $equipas) {

            $userIds = collect($equipas)
                ->pluck('user_id')
                ->filter()
                ->map(fn($id) => (int) $id)
                ->values();

            /*
         * 1. Eliminar os membros que já não estão
         *    na lista enviada pelo frontend.
         */
            $casoPlaneado
                ->casoEquipa()
                ->when(
                    $userIds->isNotEmpty(),
                    fn($query) => $query->whereNotIn('user_id', $userIds),
                    fn($query) => $query
                )
                ->delete();

            /*
         * 2. Adicionar novos membros
         *    ou atualizar os existentes.
         */
            foreach ($equipas as $equipa) {
                if (empty($equipa['user_id'])) {
                    continue;
                }

                $casoPlaneado->casoEquipa()->updateOrCreate(
                    [
                        'user_id' => $equipa['user_id'],
                    ],
                    [
                        'funcao' => $equipa['funcao'] ?? null,
                    ]
                );
            }
        });
    }

    public function getSalas(): array
    {
        return \App\Models\Sala::query()
            ->where('ativa', true)
            ->orderBy('polo')
            ->orderBy('codigo')
            ->get()
            ->map(function ($sala) {
                return [
                    'id' => $sala->id,
                    'nome_sala' => $sala->nome_sala,
                ];
            })
            ->toArray();
    }
}
