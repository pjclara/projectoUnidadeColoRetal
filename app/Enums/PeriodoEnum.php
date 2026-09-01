<?php

namespace App\Enums;

enum PeriodoEnum: string
{
    case P_0_14 = '0/14';
    case P_14_20 = '14/20';
    case DIA = 'Dia';
    case NOITE = 'Noite';
    case TODO_O_DIA = 'Todo o dia';

    public function label(): string
    {
        return match ($this) {
            self::P_0_14 => '08–14',
            self::P_14_20 => '14–20',
            self::DIA => 'Dia',
            self::NOITE => 'Noite',
            self::TODO_O_DIA => 'Todo o dia',
        };
    }

    public static function options(): array
    {
        return [
            [
                'value' => self::P_0_14->value,
                'label' => self::P_0_14->label(),
            ],
            [
                'value' => self::P_14_20->value,
                'label' => self::P_14_20->label(),
            ],
            [
                'value' => self::DIA->value,
                'label' => self::DIA->label(),
            ],
            [
                'value' => self::NOITE->value,
                'label' => self::NOITE->label(),
            ],
            [
                'value' => self::TODO_O_DIA->value,
                'label' => self::TODO_O_DIA->label(),
            ],
        ];
    }
}
