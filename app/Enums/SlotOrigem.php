<?php

namespace App\Enums;

enum SlotOrigem:string
{
    case ERAS = 'eras';
    case EXTRA = 'extra';
    case REGULAR = 'regular';

    public function label(): string
    {
        return match ($this) {
            self::ERAS => 'ERAS',
            self::EXTRA => 'Extra',
            self::REGULAR => 'Regular',
        };
    }

    public static function options(): array
    {
        return [
            [
                'value' => self::ERAS->value,
                'label' => self::ERAS->label(),
            ],
            [
                'value' => self::EXTRA->value,
                'label' => self::EXTRA->label(),
            ],
            [
                'value' => self::REGULAR->value,
                'label' => self::REGULAR->label(),
            ],
        ];
    }
}
