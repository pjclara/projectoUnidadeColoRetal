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
        Schema::table('caso_equipa', function (Blueprint $table) {
            $table->foreign(['caso_planeado_id'], 'caso_equipa_ibfk_1')->references(['caso_planeado_id'])->on('caso_planeado')->onUpdate('no action')->onDelete('cascade');
            $table->foreign(['profissional_id'], 'caso_equipa_ibfk_2')->references(['profissional_id'])->on('profissional')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('caso_equipa', function (Blueprint $table) {
            $table->dropForeign('caso_equipa_ibfk_1');
            $table->dropForeign('caso_equipa_ibfk_2');
        });
    }
};
