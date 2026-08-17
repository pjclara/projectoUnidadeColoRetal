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
        Schema::create('slots', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('semana_id')->index('idx_slot_semana');
            $table->date('data')->index('idx_slot_data');
            $table->string('polo', 30);
            $table->bigInteger('sala_id')->nullable();
            $table->string('periodo', 30);
            $table->time('hora_inicio')->nullable();
            $table->time('hora_fim_prevista')->nullable();
            $table->string('modalidade', 30);
            $table->string('estado', 30)->default('RASCUNHO');
            $table->enum('origem', ['ERAS', 'EXTRA', 'REGULAR'])->index('idx_slot_origem');
            $table->text('observacoes')->nullable();

            $table->unique(['data', 'sala_id', 'periodo', 'hora_inicio'], 'data');
            $table->index(['sala_id', 'periodo'], 'idx_slot_sala_periodo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('slots');
    }
};
