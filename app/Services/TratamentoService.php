<?php

namespace App\Services;

use App\Models\Tratamento;
use App\ViewModels\DoenteViewModel;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TratamentoService
{

    public function __construct(private readonly \App\Services\EncryptionService $encryptionService) {}

    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Tratamento::with('doente')
            ->latest('id')
            ->paginate($perPage)->through(function (Tratamento $tratamento) {
                return [
                    'id' => $tratamento->id,
                    'doente' => $tratamento->doente
                        ? (new DoenteViewModel($tratamento->doente, $this->encryptionService))->toArray()
                        : null,
                    'episodio_id' => $tratamento->episodio_id,
                    'tipo' => $tratamento->tipo,
                    'data_proposta' => $tratamento->data_proposta->format('Y-m-d'),
                    'data_inicio' => $tratamento->data_inicio->format('Y-m-d'),
                    'data_fim' => $tratamento->data_fim->format('Y-m-d'),
                    'intencao' => $tratamento->intencao,
                    'observacoes' => $tratamento->observacoes,
                ];
            });
    }

    public function create(array $data): Tratamento
    {
        return Tratamento::create($data);
    }

    public function update(Tratamento $tratamento, array $data): Tratamento
    {
        $tratamento->update($data);

        return $tratamento->refresh();
    }
}
