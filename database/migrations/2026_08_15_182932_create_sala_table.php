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
        Schema::create('salas', function (Blueprint $table) {
            $table->id();
            $table->string('polo', 30)->index('idx_sala_polo');
            $table->string('codigo', 20);
            $table->string('designacao', 80)->nullable();
            $table->boolean('ativa')->default(true);
            $table->timestamps();

            $table->unique(['polo', 'codigo'], 'idx_sala_polo_codigo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salas');
    }
};
