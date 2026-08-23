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
        Schema::create('seguimento', function (Blueprint $table) {
            $table->id();
            $table->foreignId('episodio_id')->constrained('episodios')->onDelete('cascade')->index('idx_seg_ep');
            $table->date('data_avaliacao');
            $table->string('estado_vital', 20)->nullable();
            $table->boolean('recidiva_local')->nullable();
            $table->boolean('readmissao')->nullable();
            $table->boolean('reoperacao')->nullable();
            $table->text('observacoes')->nullable();
            $table->timestamps();
            $table->unique(['episodio_id', 'data_avaliacao'], 'episodio_id');
            $table->index(['episodio_id', 'data_avaliacao'], 'idx_seg_ep_data');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seguimento');
    }
};
