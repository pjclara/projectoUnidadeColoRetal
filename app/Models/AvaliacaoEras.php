<?php

namespace App\Models;

use App\Enums\PoloEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AvaliacaoEras extends Model
{
    /** @use HasFactory<\Database\Factories\AvaliacaoErasFactory> */
    use HasFactory;

    protected $fillable = [
        'episodio_id',
        'data_consulta',
        'aptidao',
        'asa',
        'polo_recomendado',
        'mfr',
        'dias_prehabilitacao',
        'notas',
        'fonte'
    ];

    protected $casts = [
        'polo_recomendado' => PoloEnum::class,
        'data_consulta' => 'date',
    ];

    public function episodio()
    {
        return $this->belongsTo(Episodio::class);
    }
}
