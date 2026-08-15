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
        Schema::create('doente', function (Blueprint $table) {
            $table->id();

            // Campos encriptados (reversíveis)
            $table->binary('nome_cipher');
            $table->binary('nome_tag');


            // Campos pesquisáveis (hash determinístico)
            $table->char('pu_hash', 64)->index('idx_doente_pu_hash');
            $table->binary('pu_salt');

            // Outros dados
            $table->date('data_nascimento')->nullable()->index('idx_doente_data_nascimento');
            $table->string('sexo', 1)->nullable()->index('idx_doente_sexo');

            $table->timestamps();

            $table->unique(['pu_hash'], 'pu_hash');
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
