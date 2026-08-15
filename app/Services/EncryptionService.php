<?php

namespace App\Services;

class EncryptionService
{
    private string $key;

    public function __construct()
    {
        // A chave deve ter 32 bytes (AES-256)
        $this->key = base64_decode(env('APP_KEY'));
    }

    /**
     * Encriptar valor com AES-256-GCM
     */
    public function encrypt(string $value): array
    {
        $iv = random_bytes(12); // nonce recomendado para GCM

        $cipher = openssl_encrypt(
            $value,
            'aes-256-gcm',
            $this->key,
            OPENSSL_RAW_DATA,
            $iv,
            $tag
        );

        return [
            'cipher' => $cipher,
            'iv'     => $iv,
            'tag'    => $tag,
        ];
    }

    /**
     * Desencriptar valor com AES-256-GCM
     */
    public function decrypt(string $cipher, string $iv, string $tag): string
    {
        return openssl_decrypt(
            $cipher,
            'aes-256-gcm',
            $this->key,
            OPENSSL_RAW_DATA,
            $iv,
            $tag
        );
    }

    /**
     * Criar hash pesquisável (irreversível)
     */
    public function searchableHash(string $value): array
    {
        $salt = random_bytes(16);
        $hash = hash('sha256', $salt . $value);

        return [
            'hash' => $hash,
            'salt' => $salt,
        ];
    }
}
