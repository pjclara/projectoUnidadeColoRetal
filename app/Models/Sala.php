<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala extends Model
{
    /** @use HasFactory<\Database\Factories\SalaFactory> */
    use HasFactory;

    protected $fillable = [
        'polo',
        'codigo',
        'designacao',
        'ativa',
    ];

    protected $casts = [
        'polo' => \App\Enums\PoloEnum::class,
        'ativa' => 'boolean',
    ];

    public $appends = ['nome_sala'];

    public function getNomeSalaAttribute()
    {
        return $this->polo->label() . ' - ' . $this->codigo;
    }
}
