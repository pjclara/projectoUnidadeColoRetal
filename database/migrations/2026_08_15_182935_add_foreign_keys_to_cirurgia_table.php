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
        Schema::table('cirurgia', function (Blueprint $table) {
            $table->foreign(['episodio_id'], 'cirurgia_ibfk_1')->references(['episodio_id'])->on('episodio')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['caso_planeado_id'], 'cirurgia_ibfk_2')->references(['caso_planeado_id'])->on('caso_planeado')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cirurgia', function (Blueprint $table) {
            $table->dropForeign('cirurgia_ibfk_1');
            $table->dropForeign('cirurgia_ibfk_2');
        });
    }
};
