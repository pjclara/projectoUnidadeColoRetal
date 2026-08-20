<?php

namespace App\Services;

use App\Models\Doente;
use App\ViewModels\DoenteViewModel;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class DoenteService
{
    public function __construct(
        private EncryptionService $encryption,
    ) {}

    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Doente::query()
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Pesquisa doentes por PU/nome (via hash pesquisável) e/ou data de nascimento,
     * devolvendo apenas os dados necessários ao frontend (sem campos encriptados).
     *
     * @param  array{search?: string, pu?: string, nome?: string, data_nascimento?: string}  $filters
     */
    public function search(array $filters, int $perPage = 10): LengthAwarePaginator
    {
        $pu = trim($filters['pu'] ?? '');
        $nome = trim($filters['nome'] ?? '');
        $search = trim($filters['search'] ?? '');
        $dataNascimento = trim($filters['data_nascimento'] ?? '');

        return Doente::query()
            ->when($pu, fn ($query) => $query->where(
                'pu_hash',
                $this->encryption->searchableHashNormalized($pu),
            ))
            ->when($nome, fn ($query) => $query->where(
                'nome_hash',
                $this->encryption->searchableHashNormalized($nome),
            ))
            ->when($search && ! $pu && ! $nome, function ($query) use ($search) {
                $hash = $this->encryption->searchableHashNormalized($search);

                $query->where(fn ($query) => $query
                    ->where('nome_hash', $hash)
                    ->orWhere('pu_hash', $hash));
            })
            ->when($dataNascimento, fn ($query) => $query->where('data_nascimento', $dataNascimento))
            ->latest()
            ->paginate($perPage, ['*'], 'doentes_page')
            ->withQueryString()
            ->through(fn (Doente $doente) => (new DoenteViewModel($doente, $this->encryption))->toArray());
    }
}
