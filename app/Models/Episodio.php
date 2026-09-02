<?php

namespace App\Models;

use Database\Factories\EpisodioFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Episodio extends Model
{
    /** @use HasFactory<EpisodioFactory> */
    use HasFactory;

    protected $fillable = [
        'doente_id',
        'motivo',
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
        'observacoes',
    ];

    protected function casts(): array
    {
        return [
            'data_diagnostico' => 'date:Y-m-d',
            'centro_referencia' => 'boolean',
            'pai_entrada' => 'date:Y-m-d',
            'pai_saida' => 'date:Y-m-d',
        ];
    }

    public function doente()
    {
        return $this->belongsTo(Doente::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function cdts()
    {
        return $this->hasMany(CDT::class);
    }
}
