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
        Schema::create('atividade_diaria', function (Blueprint $table) {
            $table->id('id');
            $table->date('data')->index('idx_atividade_data');
            $table->foreignId('profissional_id')->constrained('users')->onDelete('cascade');
            $table->string('tipo', 40);
            $table->string('polo', 30)->nullable();
            $table->string('periodo', 30)->nullable();
            $table->string('detalhe', 200)->nullable();
            $table->string('fonte', 80)->nullable();
            $table->timestamps();


            $table->unique(['data', 'profissional_id', 'tipo', 'periodo'], 'data');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('atividade_diaria');
    }
};
