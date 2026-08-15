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
        Schema::table('auditoria_qualidade', function (Blueprint $table) {
            $table->foreign(['responsavel_id'], 'auditoria_qualidade_ibfk_1')->references(['profissional_id'])->on('profissional')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('auditoria_qualidade', function (Blueprint $table) {
            $table->dropForeign('auditoria_qualidade_ibfk_1');
        });
    }
};
