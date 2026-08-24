<?php

namespace App\Enums;

enum PeriodoEnum: string
{
    case MANHA = 'Manhã';
    case TARDE = 'Tarde';
    case NOITE = 'Noite';

    public function label(): string
    {
        return match ($this) {
            self::MANHA => 'Manhã',
            self::TARDE => 'Tarde',
            self::NOITE => 'Noite',
        };
    }

    public static function options(): array
    {
        return [
            [
                'value' => self::MANHA->value,
                'label' => self::MANHA->label(),
            ],
            [
                'value' => self::TARDE->value,
                'label' => self::TARDE->label(),
            ],
            [
                'value' => self::NOITE->value,
                'label' => self::NOITE->label(),
            ],
        ];
    }
}
