<?php

namespace App\Models;

use App\Models\AvaliacaoEras;
use App\Models\CasoPlaneado;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cirurgia extends Model
{
    protected $fillable = [
        'caso_planeado_id',
        'procedimento',
        'abordagem',
        'urgencia',
        'reto',
        'terc_inferior_reto',
        'excisao_mesorrecto',
        'ressecao_curativa',
        'colostomia_definitiva',
        'anastomose',
        'eras_id',
        'observacoes',
    ];

    protected $casts = [
        'urgencia' => 'boolean',
        'reto' => 'boolean',
        'terc_inferior_reto' => 'boolean',
        'excisao_mesorrecto' => 'boolean',
        'ressecao_curativa' => 'boolean',
        'colostomia_definitiva' => 'boolean',
        'anastomose' => 'boolean',
    ];

    /** @use HasFactory<\Database\Factories\CirurgiaFactory> */
    use HasFactory;

    public function casoPlaneado()
    {
        return $this->belongsTo(CasoPlaneado::class, 'caso_planeado_id');
    }

    public function eras()
    {
        return $this->belongsTo(AvaliacaoEras::class, 'eras_id');
    }
}
