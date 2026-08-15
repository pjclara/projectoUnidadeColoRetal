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
        Schema::create('caso_planeado', function (Blueprint $table) {
            $table->bigInteger('caso_planeado_id', true);
            $table->bigInteger('slot_id')->index('idx_caso_slot');
            $table->char('episodio_id', 36)->nullable()->index('idx_caso_ep');
            $table->smallInteger('ordem');
            $table->string('procedimento_previsto', 300);
            $table->integer('duracao_prevista_min')->nullable();
            $table->boolean('anestesia_apto')->nullable();
            $table->string('cama_destino', 40)->nullable();
            $table->dateTime('internamento_em')->nullable();
            $table->bigInteger('cirurgiao_id')->nullable()->index('idx_caso_cirurgiao');
            $table->text('observacoes')->nullable();

            $table->unique(['slot_id', 'ordem'], 'slot_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('caso_planeado');
    }
};
