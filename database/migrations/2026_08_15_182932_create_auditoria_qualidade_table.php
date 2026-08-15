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
        Schema::create('auditoria_qualidade', function (Blueprint $table) {
            $table->bigInteger('auditoria_id', true);
            $table->string('codigo_indicador', 30)->index('idx_auditoria_codigo');
            $table->date('periodo_inicio');
            $table->date('periodo_fim');
            $table->decimal('numerador', 20, 4)->nullable();
            $table->decimal('denominador', 20, 4)->nullable();
            $table->decimal('valor_absoluto', 20, 4)->nullable();
            $table->string('fonte', 100)->nullable();
            $table->bigInteger('responsavel_id')->nullable()->index('responsavel_id');
            $table->text('notas')->nullable();

            $table->unique(['codigo_indicador', 'periodo_inicio', 'periodo_fim'], 'codigo_indicador');
            $table->index(['periodo_inicio', 'periodo_fim'], 'idx_auditoria_periodo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auditoria_qualidade');
    }
};
