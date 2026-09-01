<?php

namespace App\Enums;

enum ModalidadeEnum: string
{
    case INTERNAMENTO = 'Internamento';
    case UCA = 'UCA';
    case ADICIONAL = 'Adicional';


    public function label(): string
    {
        return match ($this) {
            self::INTERNAMENTO => 'Internamento',
            self::UCA => 'UCA',
            self::ADICIONAL => 'Adicional',
        };
    }

    public static function options(): array
    {
        return [
            [
                'value' => self::INTERNAMENTO->value,
                'label' => self::INTERNAMENTO->label(),
            ],
            [
                'value' => self::UCA->value,
                'label' => self::UCA->label(),
            ],
            [
                'value' => self::ADICIONAL->value,
                'label' => self::ADICIONAL->label(),
            ],
        ];
    }
}
