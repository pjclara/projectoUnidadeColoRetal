import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';

export type DoenteFormData = {
    nome: string;
    pu: string;
    data_nascimento: string;
    sexo: string;
};

interface DoenteFormProps {
    form: DoenteFormData;
    errors?: Partial<Record<keyof DoenteFormData, string>>;
    onChange: <K extends keyof DoenteFormData>(
        field: K,
        value: DoenteFormData[K],
    ) => void;
    disabled?: boolean;
    
}

export function DoenteForm({
    form,
    errors = {},
    onChange,
    disabled = false,
}: DoenteFormProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <AppInputField
                label="Nome form"
                value={form.nome}
                onChange={(value) =>
                    onChange('nome', String(value))
                }
                error={errors.nome}
                placeholder="Nome completo"
                disabled={disabled}
                required
            />

            <AppInputField
                label="PU"
                type="number"
                value={form.pu}
                onChange={(value) =>
                    onChange('pu', String(value))
                }
                error={errors.pu}
                placeholder="Número PU"
                disabled={disabled}
                required
            />

            <AppInputField
                label="Data de nascimento"
                type="date"
                value={form.data_nascimento}
                onChange={(value) =>
                    onChange('data_nascimento', String(value))
                }
                error={errors.data_nascimento}
                disabled={disabled}
            />

            <AppSelectField
                label="Sexo"
                value={form.sexo}
                onChange={(value) =>
                    onChange('sexo', String(value))
                }
                error={errors.sexo}
                disabled={disabled}
                options={[
                    {
                        value: 'M',
                        label: 'Masculino',
                    },
                    {
                        value: 'F',
                        label: 'Feminino',
                    },
                    {
                        value: 'O',
                        label: 'Outro',
                    },
                ]}
            />
        </div>
    );
}