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
        Schema::create('auditoria_alteracao', function (Blueprint $table) {
            $table->id();
            $table->string('tabela', 80)->index('idx_auditoria_tabela');
            $table->text('chave_registo');
            $table->char('operacao', 1);
            $table->string('utilizador', 120);
            $table->dateTime('instante')->useCurrent()->index('idx_auditoria_instante');
            $table->json('antes')->nullable();
            $table->json('depois')->nullable();
            $table->text('motivo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auditoria_alteracao');
    }
};
