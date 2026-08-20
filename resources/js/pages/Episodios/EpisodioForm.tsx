import { AppCheckboxField } from '@/components/app/app-check-box-field';
import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppTextareaField } from '@/components/app/app-textarea-field';

export type EpisodioFormData = {
    tipo: string;
    diagnostico: string;
    cid10: string;
    data_diagnostico: string;
    centro_referencia: boolean;
    pai_entrada: string;
    pai_saida: string;
    motivo_saida: string;
    user_id: number | string;
    estado: string;
    observacoes: string;
};

type Profissional = {
    id: number;
    name: string;
};

type Props = {
    form: EpisodioFormData;
    errors?: Record<string, string>;
    profissionais: Profissional[];
    onChange: <K extends keyof EpisodioFormData>(
        field: K,
        value: EpisodioFormData[K],
    ) => void;

};

export function EpisodioForm({
    form,
    errors = {},
    profissionais,
    onChange,
}: Props) {
    return (
        <div className="space-y-6">

            <div className="grid gap-6 md:grid-cols-2">

                <AppSelectField
                    label="Tipo"
                    value={form.tipo}
                    error={errors.tipo}
                    required
                    onChange={(value) =>
                        onChange('tipo', String(value))
                    }
                    options={[
                        {
                            value: 'ONCOLOGICO',
                            label: 'Oncológico',
                        },
                        {
                            value: 'BENIGNO',
                            label: 'Benigno',
                        },
                        {
                            value: 'DII',
                            label: 'DII',
                        },
                        {
                            value: 'FUNCIONAL',
                            label: 'Funcional',
                        },
                        {
                            value: 'OUTRO',
                            label: 'Outro',
                        },
                    ]}
                />

                <AppInputField
                    label="Diagnóstico"
                    value={form.diagnostico}
                    error={errors.diagnostico}
                    onChange={(value) =>
                        onChange(
                            'diagnostico',
                            String(value),
                        )
                    }
                />

                <AppInputField
                    label="CID-10"
                    value={form.cid10}
                    error={errors.cid10}
                    onChange={(value) =>
                        onChange(
                            'cid10',
                            String(value),
                        )
                    }
                />

                <AppInputField
                    label="Data do diagnóstico"
                    type="date"
                    value={form.data_diagnostico}
                    error={errors.data_diagnostico}
                    onChange={(value) =>
                        onChange(
                            'data_diagnostico',
                            String(value),
                        )
                    }
                />

                <AppCheckboxField
                    label="Centro de Referência"
                    checked={form.centro_referencia}
                    error={errors.centro_referencia}
                    onChange={(value) =>
                        onChange(
                            'centro_referencia',
                            Boolean(value),
                        )
                    }
                />

                <AppInputField
                    label="PAI - Entrada"
                    type="date"
                    value={form.pai_entrada}
                    error={errors.pai_entrada}
                    onChange={(value) =>
                        onChange(
                            'pai_entrada',
                            String(value),
                        )
                    }
                />

                <AppInputField
                    label="PAI - Saída"
                    type="date"
                    value={form.pai_saida}
                    error={errors.pai_saida}
                    onChange={(value) =>
                        onChange(
                            'pai_saida',
                            String(value),
                        )
                    }
                />

                <AppInputField
                    label="Motivo da saída"
                    value={form.motivo_saida}
                    error={errors.motivo_saida}
                    onChange={(value) =>
                        onChange(
                            'motivo_saida',
                            String(value),
                        )
                    }
                />

                <AppSelectField
                    label="Profissional"
                    value={form.user_id}
                    error={errors.user_id}
                    onChange={(value) =>
                        onChange(
                            'user_id',
                            String(value),
                        )
                    }
                    options={profissionais.map(
                        (profissional) => ({
                            value: profissional.id,
                            label: profissional.name,
                        }),
                    )}
                />

                <AppSelectField
                    label="Estado"
                    value={form.estado}
                    error={errors.estado}
                    onChange={(value) =>
                        onChange(
                            'estado',
                            String(value),
                        )
                    }
                    options={[
                        {
                            value: 'ATIVO',
                            label: 'Ativo',
                        },
                        {
                            value: 'INATIVO',
                            label: 'Inativo',
                        },
                        {
                            value: 'ENCERRADO',
                            label: 'Encerrado',
                        },
                    ]}
                />

            </div>

            <AppTextareaField
                label="Observações"
                value={form.observacoes}
                error={errors.observacoes}
                onChange={(value) =>
                    onChange(
                        'observacoes',
                        String(value),
                    )
                }
            />

        </div>
    );
}