<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('doentes', function (Blueprint $table) {
            $table->id();

            // PU cifrado (AES‑256‑GCM)
            $table->binary('pu_cipher');   // ciphertext
            $table->binary('pu_iv');       // 12 bytes
            $table->binary('pu_tag');      // 16 bytes

            // Hash pesquisável (irreversível)
            $table->char('pu_hash', 64)
                ->unique('uq_doentes_pu_hash');

            // Nome cifrado
            $table->binary('nome_cipher');
            $table->binary('nome_iv');
            $table->binary('nome_tag');

            // Outros campos
            $table->date('data_nascimento')
                ->nullable()
                ->index('idx_doente_data_nascimento');

            $table->string('sexo', 1)
                ->nullable()
                ->index('idx_doente_sexo');

            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doente');
    }
};
