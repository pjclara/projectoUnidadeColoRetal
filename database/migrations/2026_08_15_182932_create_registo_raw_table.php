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
        Schema::create('registo_raw', function (Blueprint $table) {
            $table->bigInteger('importacao_id')->index('idx_raw_importacao');
            $table->integer('numero_linha');
            $table->bigInteger('eras_id')->nullable();
            $table->json('payload');

            $table->primary(['importacao_id', 'numero_linha']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registo_raw');
    }
};
