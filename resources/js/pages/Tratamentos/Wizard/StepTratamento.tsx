import { router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppInputField } from '@/components/app/app-input-field';
import { AppModalForm } from '@/components/app/app-modal-form';
import { AppTextareaField } from '@/components/app/app-textarea-field';

import type { Doente, Episodio, Tratamento } from '../../../types/types';
import { AppSelectField } from '@/components/app/app-input-select';

type Props = {
    doente: Doente;
    episodio: Episodio;
    onBack: () => void;
    onSuccess: (tratamento: Tratamento) => void;
};

type FormData = {
    episodio_id: number;
    tipo: string;
    data_proposta: string;
    data_inicio: string;
    data_fim: string;
    intencao: string;
    observacoes: string;
};

export function StepTratamento({ doente, episodio, onBack, onSuccess }: Props) {
    const [form, setForm] = useState<FormData>({
        episodio_id: episodio.id,
        tipo: '',
        data_proposta: '',
        data_inicio: '',
        data_fim: '',
        intencao: '',
        observacoes: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: '' }));
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrors({});

        router.post('/tratamentos', form, {
            preserveScroll: true,

            onSuccess: (page) => {
                toast.success('Tratamento criado com sucesso.');

                const createdTratamento = (page.props as { flash?: { created_tratamento?: Tratamento } }).flash?.created_tratamento;

                if (createdTratamento) {
                    onSuccess(createdTratamento);
                }
            },

            onError: (validationErrors: Record<string, string>) => {
                setErrors(validationErrors);
                toast.error('Verifique os dados introduzidos.');
            },

            onFinish: () => setLoading(false),
        });
    };

    return (
        <AppModalForm
            open
            title="Novo Tratamento"
            description="Preencha os dados do tratamento."
            onClose={onBack}
            onSubmit={submit}
            loading={loading}
            maxWidth="3xl"
            submitLabel="Criar Tratamento"
        >
            <AppEntitySummary
                title="Doente"
                fields={[
                    { label: 'Nome', value: doente.nome },
                    { label: 'PU', value: doente.pu },
                ]}
            />

            <AppEntitySummary
                title="Episódio"
                fields={[
                    { label: 'Tipo', value: episodio.tipo },
                    { label: 'Diagnóstico', value: episodio.diagnostico },
                    { label: 'CID10', value: episodio.cid10 },
                    { label: 'Data diagnóstico', value: episodio.data_diagnostico },
                    { label: 'Estado', value: episodio.estado },
                ]}
            />

            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                    <AppSelectField
                        label="Tipo"
                        value={form.tipo}
                        onChange={(value) => updateField('tipo', String(value))}
                        error={errors.tipo}
                        options={[
                            { label: 'Quimioterapia', value: 'quimioterapia' },
                            { label: 'Radioterapia', value: 'radioterapia' },
                            { label: 'Imunoterapia', value: 'imunoterapia' },
                            { label: 'Cirurgia', value: 'cirurgia' },
                        ]}
                    />
                    <AppInputField
                        label="Data da proposta"
                        type="date"
                        value={form.data_proposta}
                        onChange={(value) => updateField('data_proposta', value)}
                        error={errors.data_proposta}
                    />

                    <AppInputField
                        label="Data de início"
                        type="date"
                        value={form.data_inicio}
                        onChange={(value) => updateField('data_inicio', value)}
                        error={errors.data_inicio}
                    />

                    <AppInputField
                        label="Data de fim"
                        type="date"
                        value={form.data_fim}
                        onChange={(value) => updateField('data_fim', value)}
                        error={errors.data_fim}
                    />
                    <AppSelectField
                        label="Intenção"
                        value={form.intencao}
                        onChange={(value) => updateField('intencao', String(value))}
                        error={errors.intencao}
                        options={[
                            { label: 'Curativo', value: 'curativo' },
                            { label: 'Paliativo', value: 'paliativo' },
                        ]}
                    />
                </div>

                <AppTextareaField
                    label="Observações"
                    value={form.observacoes}
                    onChange={(value) => updateField('observacoes', value)}
                    error={errors.observacoes}
                />
            </div>
        </AppModalForm>
    );
}
