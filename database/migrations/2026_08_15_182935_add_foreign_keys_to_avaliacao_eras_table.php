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
        Schema::table('avaliacao_eras', function (Blueprint $table) {
            $table->foreign(['episodio_id'], 'avaliacao_eras_ibfk_1')->references(['episodio_id'])->on('episodio')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('avaliacao_eras', function (Blueprint $table) {
            $table->dropForeign('avaliacao_eras_ibfk_1');
        });
    }
};
