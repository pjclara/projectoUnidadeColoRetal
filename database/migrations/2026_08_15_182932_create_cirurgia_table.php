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
        Schema::create('cirurgias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('episodio_id')->constrained('episodios')->onDelete('cascade');
            $table->foreignId('caso_planeado_id')->nullable()->constrained('casos_planeados')->onDelete('set null');
            $table->date('data_cirurgia')->index('idx_cirurgia_data');
            $table->string('polo', 30)->nullable();
            $table->string('sala', 20)->nullable();
            $table->string('procedimento', 300)->nullable();
            $table->string('abordagem', 50)->nullable();
            $table->boolean('urgencia')->nullable()->default(false);
            $table->boolean('reto')->nullable()->default(false);
            $table->boolean('terc_inferior_reto')->nullable()->default(false);
            $table->boolean('excisao_mesorrecto')->nullable();
            $table->boolean('ressecao_curativa')->nullable();
            $table->boolean('colostomia_definitiva')->nullable();
            $table->boolean('anastomose')->nullable();
            $table->foreignId('eras_id')->nullable()->constrained('avaliacao_eras')->onDelete('set null');
            $table->string('observacoes', 500)->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cirurgias');
    }
};
