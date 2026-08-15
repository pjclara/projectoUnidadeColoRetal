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
        Schema::create('caso_equipa', function (Blueprint $table) {
            $table->bigInteger('caso_planeado_id');
            $table->bigInteger('profissional_id')->index('idx_equipa_profissional');
            $table->string('funcao', 30);

            $table->primary(['caso_planeado_id', 'profissional_id', 'funcao']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('caso_equipa');
    }
};
