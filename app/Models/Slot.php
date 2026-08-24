<?php

namespace App\Models;

use App\Enums\ModalidadeEnum;
use App\Enums\PeriodoEnum;
use App\Enums\SlotEstadoEnum;
use App\Enums\SlotOrigemEnum;
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
        'estado' => SlotEstadoEnum::class,
        'origem' => SlotOrigemEnum::class,
        'periodo' => PeriodoEnum::class,
        'modalidade' => ModalidadeEnum::class,
        'data' => 'date',
        'hora_inicio' => 'datetime:H:i',
        'hora_fim_prevista' => 'datetime:H:i',
    ];

    // appends the nome_slot attribute to the model's array and JSON representations
    protected $appends = ['nome_slot'];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($slot) {
            $slot->semana_id = date('W', strtotime($slot->data));
            $slot->polo = $slot->sala->polo;
        });
        static::updating(function ($slot) {
            $slot->semana_id = date('W', strtotime($slot->data));
            $slot->polo = $slot->sala->polo;
        });

    }

    public function getNomeSlotAttribute()
    {
        return $this->data->format('d/m/Y') . ' - ' . $this->sala_id . ' - ' . $this->periodo->label() . ' - ' . $this->modalidade->label();
    }

    public function sala()
    {
        return $this->belongsTo(Sala::class);
    }



}
