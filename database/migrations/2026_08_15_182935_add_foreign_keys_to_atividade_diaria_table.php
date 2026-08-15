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
        Schema::table('atividade_diaria', function (Blueprint $table) {
            $table->foreign(['profissional_id'], 'atividade_diaria_ibfk_1')->references(['profissional_id'])->on('profissional')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('atividade_diaria', function (Blueprint $table) {
            $table->dropForeign('atividade_diaria_ibfk_1');
        });
    }
};
