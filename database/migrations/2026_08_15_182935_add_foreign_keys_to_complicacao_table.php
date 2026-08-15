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
        Schema::table('complicacao', function (Blueprint $table) {
            $table->foreign(['cirurgia_id'], 'complicacao_ibfk_1')->references(['cirurgia_id'])->on('cirurgia')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('complicacao', function (Blueprint $table) {
            $table->dropForeign('complicacao_ibfk_1');
        });
    }
};
