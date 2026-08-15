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
        Schema::create('cdt', function (Blueprint $table) {
            $table->bigInteger('cdt_id', true);
            $table->char('episodio_id', 36)->index('idx_cdt_ep');
            $table->date('data_pedido')->nullable();
            $table->date('data_discussao')->nullable()->index('idx_cdt_data_disc');
            $table->text('decisao')->nullable();
            $table->string('estadio_clinico', 40)->nullable();

            $table->unique(['episodio_id', 'data_discussao'], 'episodio_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cdt');
    }
};
