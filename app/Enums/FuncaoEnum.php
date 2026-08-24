<?php

namespace App\Enums;

enum FuncaoEnum: string
{
    case CIRURGIÃO = 'Cirurgião';
    case ANESTESISTA = 'Anestesista';
    case ENFERMEIRO = 'Enfermeiro';
    case AUXILIAR = 'Auxiliar';
    case OUTRO = 'Outro';

    public static function labels(): array
    {
        return [
            self::CIRURGIÃO->value => 'Cirurgião',
            self::ANESTESISTA->value => 'Anestesista',
            self::ENFERMEIRO->value => 'Enfermeiro',
            self::AUXILIAR->value => 'Auxiliar',
            self::OUTRO->value => 'Outro',
        ];
    }
    public static function options(): array
    {
        return [
            ['value' => self::CIRURGIÃO->value, 'label' => 'Cirurgião'],
            ['value' => self::ANESTESISTA->value, 'label' => 'Anestesista'],
            ['value' => self::ENFERMEIRO->value, 'label' => 'Enfermeiro'],
            ['value' => self::AUXILIAR->value, 'label' => 'Auxiliar'],
            ['value' => self::OUTRO->value, 'label' => 'Outro'],
        ];
    }
}
