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
        Schema::create('semana_planeamento', function (Blueprint $table) {
            $table->bigInteger('semana_id', true);
            $table->date('segunda_feira')->unique('segunda_feira');
            $table->integer('versao')->default(1);
            $table->string('estado', 20)->default('RASCUNHO')->index('idx_semana_estado');
            $table->dateTime('fechado_em')->nullable();
            $table->bigInteger('fechado_por')->nullable()->index('idx_semana_fechado_por');
            $table->text('observacoes')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('semana_planeamento');
    }
};
