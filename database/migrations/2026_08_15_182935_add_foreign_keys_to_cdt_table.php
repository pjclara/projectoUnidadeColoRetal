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
        Schema::table('cdt', function (Blueprint $table) {
            $table->foreign(['episodio_id'], 'cdt_ibfk_1')->references(['episodio_id'])->on('episodio')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cdt', function (Blueprint $table) {
            $table->dropForeign('cdt_ibfk_1');
        });
    }
};
