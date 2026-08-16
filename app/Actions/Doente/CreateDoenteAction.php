<?php

namespace App\Actions\Doente;

use App\Models\Doente;
use App\Services\EncryptionService;

class CreateDoenteAction
{
    public function __construct(
        private EncryptionService $encryption
    ) {
    }

    public function execute(array $data): Doente
    {
        $nome = $this->encryption->encrypt(
            $data['nome']
        );

        $pu = $this->encryption->encrypt(
            $data['pu']
        );

        $puHash = $this->encryption->searchableHash(
            $data['pu']
        );

        return Doente::create([
            'nome_cipher' => $nome['cipher'],
            'nome_iv' => $nome['iv'],
            'nome_tag' => $nome['tag'],

            'pu_cipher' => $pu['cipher'],
            'pu_iv' => $pu['iv'],
            'pu_tag' => $pu['tag'],

            'pu_hash' => $puHash,

            'data_nascimento' => $data['data_nascimento'] ?? null,
            'sexo' => $data['sexo'] ?? null,
        ]);
    }
}