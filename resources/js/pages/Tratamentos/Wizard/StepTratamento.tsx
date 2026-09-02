import { router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { AppEmptyState } from '@/components/app/app-empty-state';
import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppInputField } from '@/components/app/app-input-field';
import { AppModalForm } from '@/components/app/app-modal-form';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { AppTextareaField } from '@/components/app/app-textarea-field';
import { Button } from '@/components/ui/button';

import type { Doente, Episodio, Tratamento } from '../../../types/types';

type Props = {
    doente: Doente;
    episodio: Episodio;
    onBack: () => void;
    onSuccess: (tratamento: Tratamento) => void;
    onContinue: (tratamento: Tratamento) => void;
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

export function StepTratamento({ doente, episodio, onBack, onSuccess, onContinue }: Props) {
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
    const [showCreate, setShowCreate] = useState(false);

    const tratamentosList = episodio.tratamentos ?? [];

    const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: '' }));
    };

    const columns: AppTableColumn<Tratamento>[] = [
        { label: 'Tipo', key: 'tipo' },
        { label: 'Data proposta', key: 'data_proposta' },
        { label: 'Data de início', key: 'data_inicio' },
        { label: 'Intenção', key: 'intencao' },
        {
            label: 'Ações',
            key: 'actions',
            render: (tratamento: Tratamento) => (
                <Button type="button" onClick={() => onContinue(tratamento)}>
                    Continuar
                </Button>
            ),
        },
    ];

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
        <div className="space-y-6">
            <AppEntitySummary
                title="Doente selecionado"
                fields={[
                    { label: 'Nome', value: doente.nome },
                    { label: 'PU', value: doente.pu },
                    { label: 'Nascimento', value: doente.data_nascimento },
                    { label: 'Sexo', value: doente.sexo },
                ]}
                action={
                    <Button type="button" onClick={onBack}>
                        Alterar doente
                    </Button>
                }
            />
            <AppEntitySummary
                title="Episódio selecionado"
                fields={[
                    { label: 'Tipo', value: episodio.tipo },
                    { label: 'Diagnóstico', value: episodio.diagnostico },
                    { label: 'CID10', value: episodio.cid10 },
                    { label: 'Data diagnóstico', value: episodio.data_diagnostico },
                    { label: 'Estado', value: episodio.estado },
                ]}
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Selecionar Tratamento</h2>
                    <p className="mt-1 text-sm text-neutral-500">Escolha um tratamento existente ou registe um novo.</p>
                </div>

                <Button type="button" onClick={() => setShowCreate(true)}>
                    Novo Tratamento
                </Button>
            </div>
            {tratamentosList.length === 0 ? (
                <AppEmptyState
                    title="Este doente ainda não possui tratamentos."
                    action={{ label: 'Criar novo tratamento', onClick: () => setShowCreate(true) }}
                />
            ) : (
                <AppTable columns={columns} data={tratamentosList} rowKey={(tratamento) => tratamento.id} />
            )}
            <div className="flex justify-between border-t border-neutral-200 pt-5 dark:border-neutral-800">
                <Button type="button" onClick={onBack}>
                    Voltar
                </Button>
            </div>

            {showCreate && (
                <AppModalForm
                    open
                    title="Novo Tratamento"
                    description="Preencha os dados do tratamento."
                    onClose={() => setShowCreate(false)}
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
            )}
        </div>
    );
}
