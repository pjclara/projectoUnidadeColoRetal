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
        Schema::create('tratamento', function (Blueprint $table) {
            $table->bigInteger('tratamento_id', true);
            $table->char('episodio_id', 36)->index('idx_tratamento_ep');
            $table->string('tipo', 40)->index('idx_tratamento_tipo');
            $table->date('data_proposta')->nullable();
            $table->date('data_inicio')->nullable();
            $table->date('data_fim')->nullable();
            $table->string('intencao', 30)->nullable();
            $table->text('observacoes')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tratamento');
    }
};
