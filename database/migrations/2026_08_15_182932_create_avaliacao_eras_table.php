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
        Schema::create('avaliacao_eras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('episodio_id')->constrained('episodios')->onDelete('cascade');
            $table->date('data_consulta');
            $table->string('aptidao', 30)->nullable();
            $table->string('asa', 10)->nullable()->index('idx_eras_asa');
            $table->string('polo_recomendado', 30)->nullable();
            $table->boolean('mfr')->nullable();
            $table->integer('dias_prehabilitacao')->nullable();
            $table->text('notas')->nullable();
            $table->string('fonte', 80)->nullable();
            $table->timestamps();

            $table->unique(['episodio_id', 'data_consulta'], 'episodio_id');
            $table->index(['episodio_id', 'data_consulta'], 'idx_eras_ep_data');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avaliacao_eras');
    }
};
