<?php

namespace App\Enums;

enum LocalAtividadeEnum: string
{
    case HUC = 'huc';
    case HG = 'hg';
    case EXTERNO = 'externo';
    case NAO_APLICAVEL = 'nao_aplicavel';
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
