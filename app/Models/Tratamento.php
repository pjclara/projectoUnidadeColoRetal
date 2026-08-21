<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tratamento extends Model
{
    /** @use HasFactory<\Database\Factories\TratamentoFactory> */
    use HasFactory;


    protected $fillable = [
        'episodio_id',
        'tipo',
        'data_proposta',
        'data_inicio',
        'data_fim',
        'intencao',
        'observacoes',
    ];

    protected function casts(): array
    {
        return [
            'data_proposta' => 'date:Y-m-d',
            'data_inicio' => 'date:Y-m-d',
            'data_fim' => 'date:Y-m-d',
        ];
    }

    public function episodio()
    {
        return $this->belongsTo(Episodio::class);
    }

    public function doente()
    {
        return $this->hasOneThrough(
            Doente::class,
            Episodio::class,
            'id', // Foreign key on the Episodio table
            'id', // Foreign key on the Doente table
            'episodio_id', // Local key on the CDT table
            'doente_id' // Local key on the Episodio table
        );
    }
}
