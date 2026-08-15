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
        Schema::table('registo_raw', function (Blueprint $table) {
            $table->foreign(['importacao_id'], 'registo_raw_ibfk_1')->references(['importacao_id'])->on('importacao')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('registo_raw', function (Blueprint $table) {
            $table->dropForeign('registo_raw_ibfk_1');
        });
    }
};
