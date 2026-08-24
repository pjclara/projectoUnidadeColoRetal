<?php

namespace App\Enums;

enum SlotEstadoEnum: string
{
    case RASCUNHO = 'rascunho';
    case DISPONIVEL = 'disponivel';
    case OCUPADO = 'ocupado';
    case INDISPONIVEL = 'indisponivel';

    public function label(): string
    {
        return match ($this) {
            self::RASCUNHO => 'Rascunho',
            self::DISPONIVEL => 'Disponível',
            self::OCUPADO => 'Ocupado',
            self::INDISPONIVEL => 'Indisponível',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::RASCUNHO => 'bg-gray-500',
            self::DISPONIVEL => 'bg-green-500',
            self::OCUPADO => 'bg-blue-500',
            self::INDISPONIVEL => 'bg-red-500',
        };
    }

    public static function options(): array
    {
        return [
            [
                'value' => self::RASCUNHO->value,
                'label' => self::RASCUNHO->label(),
            ],
            [
                'value' => self::DISPONIVEL->value,
                'label' => self::DISPONIVEL->label(),
            ],
            [
                'value' => self::OCUPADO->value,
                'label' => self::OCUPADO->label(),
            ],
            [
                'value' => self::INDISPONIVEL->value,
                'label' => self::INDISPONIVEL->label(),
            ],
        ];
    }

    public function is(string $estado): bool
    {
        return $this->value === $estado;
    }
}
