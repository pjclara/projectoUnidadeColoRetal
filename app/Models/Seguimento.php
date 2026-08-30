<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seguimento extends Model
{
    protected $fillable = [
        'episodio_id',
        'data_avaliacao',
        'recidiva_local',
        'readmissao',
        'reoperacao',
        'observacoes',
    ];

    /** @use HasFactory<\Database\Factories\SeguimentoFactory> */
    use HasFactory;
}
