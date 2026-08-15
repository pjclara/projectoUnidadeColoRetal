<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doente extends Model
{
    /** @use HasFactory<\Database\Factories\DoenteFactory> */
    use HasFactory;

    protected $fillable = [
        'nome',
        'data_nascimento',
        'sexo',
        'morada',
        'telefone',
        'email',
    ];
}
