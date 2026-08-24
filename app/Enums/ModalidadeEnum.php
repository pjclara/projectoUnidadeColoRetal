<?php

namespace App\Enums;

enum ModalidadeEnum: string
{
    case AMBULATORIO = 'Ambulatório';
    case PROGRAMADO = 'Programado';
    case ADICIONAL = 'Adicional';
    case URGENCIA = 'Urgência';

    public function label(): string
    {
        return match ($this) {
            self::AMBULATORIO => 'Ambulatório',
            self::PROGRAMADO => 'Programado',
            self::ADICIONAL => 'Adicional',
            self::URGENCIA => 'Urgência',
        };
    }

    public static function options(): array
    {
        return [
            [
                'value' => self::AMBULATORIO->value,
                'label' => self::AMBULATORIO->label(),
            ],
            [
                'value' => self::PROGRAMADO->value,
                'label' => self::PROGRAMADO->label(),
            ],
            [
                'value' => self::ADICIONAL->value,
                'label' => self::ADICIONAL->label(),
            ],
            [
                'value' => self::URGENCIA->value,
                'label' => self::URGENCIA->label(),
            ],
        ];
    }
}
