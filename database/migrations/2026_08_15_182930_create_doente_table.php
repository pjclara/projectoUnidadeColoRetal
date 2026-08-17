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

            $table->binary('nome_cipher');
            $table->binary('nome_iv');
            $table->binary('nome_tag');

            $table->char('nome_hash', 64)
                ->nullable()
                ->index();

            $table->binary('pu_cipher');
            $table->binary('pu_iv');
            $table->binary('pu_tag');

            $table->char('pu_hash', 64)
                ->nullable()
                ->unique();

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
