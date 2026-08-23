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
        Schema::create('complicacao', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cirurgia_id')->constrained('cirurgias')->onDelete('cascade')->index('idx_comp_episodio');
            $table->string('tipo', 80);
            $table->date('data_diagnostico')->nullable();
            $table->smallInteger('clavien_dindo')->nullable()->index('idx_comp_clavien');
            $table->boolean('durante_internamento')->nullable();
            $table->boolean('ate_30_dias')->nullable();
            $table->text('notas')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complicacao');
    }
};
