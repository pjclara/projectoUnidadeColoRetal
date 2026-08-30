<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seguimento extends Model
{
    protected $table = 'seguimento';

    protected $fillable = [
        'episodio_id',
        'data_avaliacao',
        'recidiva_local',
        'estado_vital',
        'readmissao',
        'reoperacao',
        'observacoes',
    ];

    protected $casts = [
        'data_avaliacao' => 'date:Y-m-d',
        'recidiva_local' => 'boolean',
        'readmissao' => 'boolean',
        'reoperacao' => 'boolean',
    ];

    /** @use HasFactory<\Database\Factories\SeguimentoFactory> */
    use HasFactory;

    public function episodio()
    {
        return $this->belongsTo(Episodio::class);
    }
}
