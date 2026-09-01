<?php

namespace App\Enums;

enum PerfilUtilizadorEnum: string
{
    case ADMINISTRADOR_FUNCIONAL = 'administrador_funcional';
    case COORDENACAO_UNIDADE = 'coordenacao_unidade';
    case GESTAO_CLIENTE_CIRURGICO = 'gestao_cliente_cirurgico';
    case CLINICO = 'clinico';
    case ENFERMAGEM_ERAS = 'enfermagem_eras';
    case QUALIDADE_AUDITORIA = 'qualidade_auditoria';
    case ANALISTA = 'analista';
    case INTEGRACAO = 'integracao';

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
