<?php

namespace App\Enums;

enum PoloEnum : string
{
    case HG = 'HG';
    case HUC = 'HUC';

        public function label(): string
    {
        return match ($this) {
            self::HG => 'Hospital Geral',
            self::HUC => 'Hospital Universitário de Coimbra',
        };
    }

    public static function options(): array
    {
        return [
            [
                'value' => self::HG->value,
                'label' => self::HG->label(),
            ],
            [
                'value' => self::HUC->value,
                'label' => self::HUC->label(),
            ],
        ];
    }

}
