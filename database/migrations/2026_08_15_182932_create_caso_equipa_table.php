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
        Schema::create('caso_equipas', function (Blueprint $table) {
            $table->foreignId('caso_planeado_id')->constrained('casos_planeados')->onDelete('cascade')->index('idx_equipa_caso');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->index('idx_equipa_profissional');
            $table->string('funcao', 30);
            $table->timestamps();

            $table->primary(['caso_planeado_id', 'user_id', 'funcao']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('caso_equipas');
    }
};
