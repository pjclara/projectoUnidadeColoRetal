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
        Schema::create('casos_planeados', function (Blueprint $table) {
            $table->id();
            $table->foreignId('slot_id')->constrained('slots')->onDelete('cascade')->index('idx_caso_slot');
            $table->foreignId('episodio_id')->constrained('episodios')->onDelete('cascade')->index('idx_caso_ep');
            $table->smallInteger('ordem');
            $table->string('procedimento_previsto', 300);
            $table->integer('duracao_prevista_min')->nullable();
            $table->boolean('anestesia_apto')->nullable();
            $table->string('cama_destino', 40)->nullable();
            $table->dateTime('internamento_em')->nullable();
            $table->foreignId('cirurgiao_id')->nullable()->constrained('users')->onDelete('set null');
            $table->text('observacoes')->nullable();
            $table->timestamps();

            $table->unique(['slot_id', 'ordem'], 'slot_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('casos_planeados');
    }
};
