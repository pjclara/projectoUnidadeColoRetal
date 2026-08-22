<?php

namespace App\Models;

use App\Enums\SlotEstado;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slot extends Model
{
    /** @use HasFactory<\Database\Factories\SlotFactory> */
    use HasFactory;
    protected $fillable = [
        'semana_id',
        'polo',
        'data',
        'sala_id',
        'periodo',
        'modalidade',
        'hora_inicio',
        'hora_fim_prevista',
        'estado',
        'origem',
        'observacoes',
    ];

    protected $casts = [
        'estado' => SlotEstado::class,
        'data' => 'date',
        'hora_inicio' => 'datetime:H:i',
        'hora_fim_prevista' => 'datetime:H:i',
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($slot) {
            $slot->semana_id = date('W', strtotime($slot->data));
        });
        static::updating(function ($slot) {
            $slot->semana_id = date('W', strtotime($slot->data));
        });

    }



}
