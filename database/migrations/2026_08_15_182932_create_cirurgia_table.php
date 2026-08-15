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
        Schema::create('cirurgia', function (Blueprint $table) {
            $table->char('cirurgia_id', 36)->primary();
            $table->char('episodio_id', 36)->index('idx_cirurgia_ep');
            $table->bigInteger('caso_planeado_id')->nullable()->index('idx_cirurgia_caso');
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
            $table->bigInteger('eras_id')->nullable()->unique('eras_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cirurgia');
    }
};
