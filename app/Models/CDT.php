<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CDT extends Model
{
    /** @use HasFactory<\Database\Factories\CDTFactory> */
    use HasFactory;

    protected $table = 'cdts';

    // a tabela cdts não tem colunas created_at/updated_at
    public $timestamps = false;

    protected $fillable = [
        'episodio_id',
        'data_pedido',
        'data_discussao',
        'decisao',
        'estadio_clinico',
    ];

    protected function casts(): array
    {
        return [
            'data_pedido' => 'date:Y-m-d',
            'data_discussao' => 'date:Y-m-d',
        ];
    }

    public function episodio()
    {
        return $this->belongsTo(Episodio::class);
    }
}
