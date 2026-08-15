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
        Schema::create('profissional', function (Blueprint $table) {
            $table->bigInteger('profissional_id', true);
            $table->string('numero_mecanografico', 20)->nullable()->unique('numero_mecanografico');
            $table->string('nome', 160)->index('idx_profissional_nome');
            $table->string('categoria', 80)->nullable();
            $table->string('especialidade', 100)->nullable()->index('idx_profissional_especialidade');
            $table->boolean('ativo')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profissional');
    }
};
