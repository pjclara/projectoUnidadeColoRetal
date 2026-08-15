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
        Schema::table('episodio', function (Blueprint $table) {
            $table->foreign(['doente_id'], 'episodio_ibfk_1')->references(['doente_id'])->on('doente')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['cirurgiao_responsavel_id'], 'episodio_ibfk_2')->references(['profissional_id'])->on('profissional')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('episodio', function (Blueprint $table) {
            $table->dropForeign('episodio_ibfk_1');
            $table->dropForeign('episodio_ibfk_2');
        });
    }
};
