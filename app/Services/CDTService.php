<?php

namespace App\Services;

use App\Models\CDT;
use App\ViewModels\DoenteViewModel;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CDTService
{
    public function __construct(
        private EncryptionService $encryptionService,
    ) {}

    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return CDT::with('doente')
            ->latest('id')
            ->paginate($perPage)->through(function (CDT $cdt) {
                return [
                    'id' => $cdt->id,
                    'doente' => $cdt->doente
                        ? (new DoenteViewModel($cdt->doente, $this->encryptionService))->toArray()
                        : null,
                    'episodio_id' => $cdt->episodio_id,
                    'data_pedido' => $cdt->data_pedido?->format('Y-m-d'),
                    'data_discussao' => $cdt->data_discussao?->format('Y-m-d'),
                    'decisao' => $cdt->decisao,
                    'estadio_clinico' => $cdt->estadio_clinico,
                ];
            });
    }

    public function create(array $data): CDT
    {
        return CDT::create($data);
    }

    public function update(CDT $cdt, array $data): CDT
    {
        $cdt->update($data);

        return $cdt->refresh();
    }
}
