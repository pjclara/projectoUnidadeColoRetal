<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Episodio extends Model
{
    /** @use HasFactory<\Database\Factories\EpisodioFactory> */
    use HasFactory;

    protected $fillable = [
        'doente_id',
        'tipo',
        'diagnostico',
        'cid10',
        'data_diagnostico',
        'centro_referencia',
        'pai_entrada',
        'pai_saida',
        'motivo_saida',
        'user_id',
        'estado',
        'observacoes'
    ];

    public function doente()
    {
        return $this->belongsTo(Doente::class);
    }
}
