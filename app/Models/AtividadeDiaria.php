<?php

namespace App\Models;

use App\Enums\PoloEnum;
use App\Enums\PeriodoEnum;
use App\Enums\TipoActividadeDiariaEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AtividadeDiaria extends Model
{
    /** @use HasFactory<\Database\Factories\AtividadeDiariaFactory> */
    use HasFactory;

    protected $table = 'atividade_diarias';

    protected $fillable = [
        'data',
        'user_id',
        'tipo',
        'polo',
        'periodo',
        'detalhe',
        'fonte'
    ];

    // cast
    protected $casts = [
        'data' => 'datetime',
        'polo' => PoloEnum::class,
        'periodo' => PeriodoEnum::class,
        'tipo' => TipoActividadeDiariaEnum::class,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
