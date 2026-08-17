<?php

namespace App\Services;

use RuntimeException;

class EncryptionService
{
    private string $key;
    private string $searchKey;

    public function __construct()
    {
        $this->key = $this->decodeKey(
            config('app.key')
        );

        $this->searchKey = $this->decodeKey(
            config('app.search_key')
        );
    }

    private function decodeKey(string $key): string
    {
        if (str_starts_with($key, 'base64:')) {
            $key = substr($key, 7);
            $key = base64_decode($key, true);
        }

        if (!is_string($key) || strlen($key) !== 32) {
            throw new RuntimeException(
                'A chave de encriptação deve ter 32 bytes.'
            );
        }

        return $key;
    }

    public function encrypt(string $value): array
    {
        $iv = random_bytes(12);

        $cipher = openssl_encrypt(
            $value,
            'aes-256-gcm',
            $this->key,
            OPENSSL_RAW_DATA,
            $iv,
            $tag
        );

        if ($cipher === false) {
            throw new RuntimeException(
                'Não foi possível encriptar o valor.'
            );
        }

        return [
            'cipher' => $cipher,
            'iv' => $iv,
            'tag' => $tag,
        ];
    }

    public function decrypt(
        string $cipher,
        string $iv,
        string $tag
    ): string {
        $value = openssl_decrypt(
            $cipher,
            'aes-256-gcm',
            $this->key,
            OPENSSL_RAW_DATA,
            $iv,
            $tag
        );

        if ($value === false) {
            throw new RuntimeException(
                'Não foi possível desencriptar o valor.'
            );
        }

        return $value;
    }

    public function searchableHash(string $value): string
    {
        return hash_hmac(
            'sha256',
            $value,
            $this->searchKey
        );
    }

    public function normalize(string $value): string
    {
        return mb_strtolower(
            trim($value),
            'UTF-8'
        );
    }

    public function searchableHashNormalized(string $value): string
    {
        return $this->searchableHash(
            $this->normalize($value)
        );
    }
}