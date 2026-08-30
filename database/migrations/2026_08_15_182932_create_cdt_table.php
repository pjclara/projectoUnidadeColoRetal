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
        Schema::create('cdts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('episodio_id')->constrained('episodios')->onDelete('cascade');
            $table->date('data_pedido')->nullable();
            $table->date('data_discussao')->nullable()->index('idx_cdt_data_disc');
            $table->text('decisao')->nullable();
            $table->string('estadio_clinico', 40)->nullable();

            $table->unique(['episodio_id', 'data_discussao'], 'idx_cdt_episodio_data_discussao');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cdts');
    }
};
