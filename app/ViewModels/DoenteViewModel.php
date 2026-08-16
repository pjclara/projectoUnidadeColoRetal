<?php

namespace App\ViewModels;

use App\Models\Doente;
use App\Services\EncryptionService;

class DoenteViewModel
{
    public function __construct(
        private Doente $doente,
        private EncryptionService $encryption
    ) {
    }

    public function toArray(): array
    {
        return [
            'id' => $this->doente->id,

            'nome' => $this->encryption->decrypt(
                $this->doente->nome_cipher,
                $this->doente->nome_iv,
                $this->doente->nome_tag,
            ),

            'pu' => $this->encryption->decrypt(
                $this->doente->pu_cipher,
                $this->doente->pu_iv,
                $this->doente->pu_tag,
            ),

            'data_nascimento' =>
                $this->doente->data_nascimento,

            'sexo' => $this->doente->sexo,

            'created_at' =>
                $this->doente->created_at?->toISOString(),

            'updated_at' =>
                $this->doente->updated_at?->toISOString(),
        ];
    }
}