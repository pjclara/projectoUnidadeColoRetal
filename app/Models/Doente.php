<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doente extends Model
{
    /** @use HasFactory<\Database\Factories\DoenteFactory> */
    use HasFactory;

    protected $fillable = [
        'nome_cipher',
        'nome_iv',
        'nome_tag',
        'pu_cipher',
        'pu_iv',
        'pu_tag',
        'pu_hash',
        'data_nascimento',
        'sexo'
    ];

    public function episodios()
    {
        return $this->hasMany(Episodio::class);
    }

    
}
