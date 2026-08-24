<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CasoEquipa extends Model
{
    /** @use HasFactory<\Database\Factories\CasoEquipaFactory> */
    use HasFactory;

    protected $fillable = [
        'caso_planeado_id',
        'user_id',
        'funcao',
    ];

    public function casoPlaneado()
    {
        return $this->belongsTo(CasoPlaneado::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
