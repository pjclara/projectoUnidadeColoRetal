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
        Schema::table('caso_planeado', function (Blueprint $table) {
            $table->foreign(['slot_id'], 'caso_planeado_ibfk_1')->references(['slot_id'])->on('slot_operatorio')->onUpdate('no action')->onDelete('cascade');
            $table->foreign(['episodio_id'], 'caso_planeado_ibfk_2')->references(['episodio_id'])->on('episodio')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['cirurgiao_id'], 'caso_planeado_ibfk_3')->references(['profissional_id'])->on('profissional')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('caso_planeado', function (Blueprint $table) {
            $table->dropForeign('caso_planeado_ibfk_1');
            $table->dropForeign('caso_planeado_ibfk_2');
            $table->dropForeign('caso_planeado_ibfk_3');
        });
    }
};
