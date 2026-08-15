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
        Schema::table('semana_planeamento', function (Blueprint $table) {
            $table->foreign(['fechado_por'], 'semana_planeamento_ibfk_1')->references(['profissional_id'])->on('profissional')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('semana_planeamento', function (Blueprint $table) {
            $table->dropForeign('semana_planeamento_ibfk_1');
        });
    }
};
