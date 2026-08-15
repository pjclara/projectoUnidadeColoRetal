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
        Schema::create('sala', function (Blueprint $table) {
            $table->bigInteger('sala_id', true);
            $table->string('polo', 30)->index('idx_sala_polo');
            $table->string('codigo', 20);
            $table->string('designacao', 80)->nullable();
            $table->boolean('ativa')->default(true);

            $table->unique(['polo', 'codigo'], 'polo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sala');
    }
};
