<?php

namespace App\Actions\Doente;

use App\Models\Doente;
use App\Services\EncryptionService;

class CreateDoenteAction
{
    public function __construct(
        private EncryptionService $encryption
    ) {}

    public function execute(array $data): Doente
    {
        $nome = $this->encryption->encrypt(
            $data['nome']
        );

        $nomeHash = $this->encryption->searchableHashNormalized(
            $data['nome']
        );

        $pu =  $data['pu'];

        $puEncrypted = $this->encryption->encrypt($pu);

        $puHash = $this->encryption->searchableHashNormalized($pu);

        return Doente::create([
            'nome_cipher' => $nome['cipher'],
            'nome_iv' => $nome['iv'],
            'nome_tag' => $nome['tag'],
            'nome_hash' => $nomeHash,

            'pu_cipher' => $puEncrypted['cipher'],
            'pu_iv' => $puEncrypted['iv'],
            'pu_tag' => $puEncrypted['tag'],
            'pu_hash' => $puHash,

            'data_nascimento' =>$data['data_nascimento'],
            'sexo' => $data['sexo'],
        ]);
    }
}
