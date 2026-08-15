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
        Schema::create('importacao', function (Blueprint $table) {
            $table->bigInteger('importacao_id', true);
            $table->string('ficheiro_nome');
            $table->char('sha256', 64)->index('idx_importacao_sha');
            $table->dateTime('importado_em')->useCurrent();
            $table->integer('total_linhas')->nullable();
            $table->string('estado', 20)->default('RECEBIDO');
            $table->json('erros')->nullable();

            $table->unique(['sha256'], 'sha256');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('importacao');
    }
};
