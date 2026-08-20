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
        Schema::create('episodios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doente_id')->constrained('doentes')->onDelete('cascade')->index('idx_episodio_doente');
            $table->enum('tipo', ['ONCOLOGICO', 'BENIGNO', 'DII', 'FUNCIONAL', 'OUTRO'])->index('idx_episodio_tipo');
            $table->string('diagnostico', 300)->nullable();
            $table->string('cid10', 20)->nullable();
            $table->date('data_diagnostico')->nullable()->index('idx_episodio_data_diag');
            $table->boolean('centro_referencia')->default(false);
            $table->date('pai_entrada')->nullable();
            $table->date('pai_saida')->nullable();
            $table->string('motivo_saida', 120)->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('estado', 30)->default('ATIVO')->index('idx_episodio_estado');
            $table->text('observacoes')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('episodios');
    }
};
