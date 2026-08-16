<?php

namespace App\Services;

use Illuminate\Support\Str;
use RuntimeException;

class EncryptionService
{
    private string $encryptionKey;

    private string $hashKey;

    public function __construct()
    {
        $this->encryptionKey = $this->resolveKey(
            config('app.key')
        );

        $this->hashKey = $this->resolveKey(
            config('app.hash_key')
        );
    }

    /**
     * AES-256-GCM.
     *
     * Retorna ciphertext, IV e authentication tag.
     */
    public function encrypt(string $value): array
    {
        $iv = random_bytes(12);

        $tag = '';

        $cipher = openssl_encrypt(
            $value,
            'aes-256-gcm',
            $this->encryptionKey,
            OPENSSL_RAW_DATA,
            $iv,
            $tag,
            '',
            16,
        );

        if ($cipher === false) {
            throw new RuntimeException(
                'Não foi possível cifrar o valor.'
            );
        }

        return [
            'cipher' => $cipher,
            'iv' => $iv,
            'tag' => $tag,
        ];
    }

    /**
     * Desencripta um valor AES-256-GCM.
     */
    public function decrypt(
        string $cipher,
        string $iv,
        string $tag
    ): string {
        $value = openssl_decrypt(
            $cipher,
            'aes-256-gcm',
            $this->encryptionKey,
            OPENSSL_RAW_DATA,
            $iv,
            $tag,
            '',
        );

        if ($value === false) {
            throw new RuntimeException(
                'Não foi possível desencriptar o valor.'
            );
        }

        return $value;
    }

    /**
     * Gera um blind index determinístico.
     *
     * O mesmo valor normalizado produz sempre
     * o mesmo hash, permitindo pesquisa.
     */
    public function searchableHash(string $value): string
    {
        $normalized = $this->normalize($value);

        return hash_hmac(
            'sha256',
            $normalized,
            $this->hashKey,
        );
    }

    /**
     * Desencripta um blind index.
     *
     * Apenas para fins de demonstração.
     */

    public function decryptSearchableHash(string $hash): string
    {
        throw new RuntimeException(
            'Blind index não pode ser desencriptado.'
        );
    }
    /**
     * Normalização básica antes do blind index.
     */
    private function normalize(string $value): string
    {
        return Str::lower(
            trim($value)
        );
    }

    /**
     * Resolve uma chave Laravel em base64 ou texto.
     */
    private function resolveKey(?string $key): string
    {
        if (! $key) {
            throw new RuntimeException(
                'Chave criptográfica não configurada.'
            );
        }

        if (str_starts_with($key, 'base64:')) {
            $key = base64_decode(
                substr($key, 7),
                true
            );
        }

        if ($key === false || strlen($key) !== 32) {
            throw new RuntimeException(
                'A chave deve ter exactamente 32 bytes.'
            );
        }

        return $key;
    }
}