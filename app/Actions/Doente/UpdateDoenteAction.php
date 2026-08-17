<?php

namespace App\Actions\Doente;

use App\Models\Doente;
use App\Services\EncryptionService;

class UpdateDoenteAction
{
    public function __construct(
        private EncryptionService $encryption
    ) {}

    public function execute(
        Doente $doente,
        array $data
    ): Doente {
        $nome = $this->encryption->encrypt(
            $data['nome']
        );

        $nomeHash = $this->encryption->searchableHash($data['nome']);

        $puHash = $this->encryption->searchableHash(
            $data['pu']
        );

        $puEncrypted = $this->encryption->encrypt($data['pu']);

        $doente->update([
            'nome_cipher' => $nome['cipher'],
            'nome_iv' => $nome['iv'],
            'nome_tag' => $nome['tag'],
            'nome_hash' => $nomeHash,

            'pu_cipher' => $puEncrypted['cipher'],
            'pu_iv' => $puEncrypted['iv'],
            'pu_tag' => $puEncrypted['tag'],
            'pu_hash' => $puHash,

            'data_nascimento' => $data['data_nascimento'] ?? null,
            'sexo' => $data['sexo'] ?? null,
        ]);

        return $doente->refresh();
    }
}
