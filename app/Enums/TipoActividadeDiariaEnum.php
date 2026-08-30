<?php

namespace App\Enums;

enum TipoActividadeDiariaEnum:string
{
    case REUNIAO = 'Reunião';
    case CONSULTA = 'Consulta';
    case BLOCO = 'Bloco';
    case URGENCIA = 'Urgência';
    case OUTRO = 'Outro';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }   

    public static function labels(): array
    {
        return array_map(fn($case) => $case->name, self::cases());
    }

    public static function options(): array
    {
        return array_map(fn($case) => ['label' => $case->name, 'value' => $case->value], self::cases());
    }
}
