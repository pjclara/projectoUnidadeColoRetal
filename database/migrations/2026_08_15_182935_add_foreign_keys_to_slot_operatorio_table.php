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
        Schema::table('slot_operatorio', function (Blueprint $table) {
            $table->foreign(['semana_id'], 'slot_operatorio_ibfk_1')->references(['semana_id'])->on('semana_planeamento')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['sala_id'], 'slot_operatorio_ibfk_2')->references(['sala_id'])->on('sala')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('slot_operatorio', function (Blueprint $table) {
            $table->dropForeign('slot_operatorio_ibfk_1');
            $table->dropForeign('slot_operatorio_ibfk_2');
        });
    }
};
