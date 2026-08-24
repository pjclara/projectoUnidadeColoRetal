import { AppCheckboxField } from '@/components/app/app-check-box-field';
import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppModalForm } from '@/components/app/app-modal-form';
import { router } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import type { AvaliacaoEras, Doente, Episodio } from '../../types/types';

type Props = {
    doente: Doente | null;
    episodio: Episodio | null;

    avaliacaoEras?: AvaliacaoEras | null;

    poloOptions: {
        value: string;
        label: string;
    }[];

    onBack?: () => void;

    onSuccess: (avaliacaoEras: AvaliacaoEras) => void;

    onClose?: () => void;
};

type FormData = {
    episodio_id: number | string;
    data_consulta: string;
    aptidao: string;
    asa: string;
    polo_recomendado: string;
    mfr: boolean;
    dias_prehabilitacao: string;
    notas: string;
    fonte: string;
};

function normalizeDate(value?: string | null): string {
    if (!value) {
        return '';
    }

    // Caso venha como YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    return date.toISOString().slice(0, 10);
}

export function CreateOrUpdateAvaliacaoEras({ doente, episodio, avaliacaoEras = null, poloOptions, onBack, onSuccess, onClose }: Props) {
    const isEdit = Boolean(avaliacaoEras);

    const emptyForm: FormData = {
        episodio_id: episodio?.id ?? '',
        data_consulta: '',
        aptidao: '',
        asa: '',
        polo_recomendado: '',
        mfr: false,
        dias_prehabilitacao: '',
        notas: '',
        fonte: '',
    };
    const [form, setForm] = useState<FormData>(emptyForm);
    useEffect(() => {
        if (avaliacaoEras) {
            setForm({
                episodio_id: avaliacaoEras.episodio_id ?? '',
                data_consulta: normalizeDate(avaliacaoEras.data_consulta),
                aptidao: avaliacaoEras.aptidao ?? '',
                asa: String(avaliacaoEras.asa ?? ''),
                polo_recomendado: String(avaliacaoEras.polo_recomendado ?? ''),
                mfr: Boolean(avaliacaoEras.mfr),
                dias_prehabilitacao: avaliacaoEras.dias_prehabilitacao != null ? String(avaliacaoEras.dias_prehabilitacao) : '',
                notas: avaliacaoEras.notas ?? '',
                fonte: avaliacaoEras.fonte ?? '',
            });

            return;
        }

        if (episodio) {
            setForm({
                ...emptyForm,
                episodio_id: episodio.id,
            });
        }
    }, [avaliacaoEras, episodio]);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        setErrors((current) => ({
            ...current,
            [field]: '',
        }));
    };

    /**
     * Submissão.
     */
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!form.episodio_id) {
            toast.error('É necessário selecionar um episódio.');
            return;
        }

        setLoading(true);
        setErrors({});

        const options = {
            preserveScroll: true,

            onSuccess: (page: any) => {
                const createdAvaliacaoEras = page.props.flash?.created_avaliacao_eras;

                const updatedAvaliacaoEras = page.props.flash?.updated_avaliacao_eras;

                const result = createdAvaliacaoEras ?? updatedAvaliacaoEras;

                toast.success(isEdit ? 'Avaliação ERAS atualizada com sucesso.' : 'Avaliação ERAS criada com sucesso.');

                if (result) {
                    onSuccess(result);
                }

                onClose?.();
            },

            onError: (validationErrors: Record<string, string>) => {
                setErrors(validationErrors);

                toast.error('Verifique os dados introduzidos.');
            },

            onFinish: () => {
                setLoading(false);
            },
        };

        if (isEdit && avaliacaoEras?.id) {
            router.put(`/avaliacao-eras/${avaliacaoEras.id}`, form, options);
        } else {
            router.post('/avaliacao-eras', form, options);
        }
    };

    const close = () => {
        if (onClose) {
            onClose();
            return;
        }

        onBack?.();
    };

    return (
        <AppModalForm
            open
            title={isEdit ? 'Editar Avaliação ERAS' : 'Nova Avaliação ERAS'}
            description={isEdit ? 'Atualize os dados da avaliação ERAS.' : 'Preencha os dados da avaliação ERAS.'}
            onClose={close}
            onSubmit={submit}
            loading={loading}
            maxWidth="3xl"
            submitLabel={isEdit ? 'Guardar alterações' : 'Criar avaliação'}
        >
            <div className="space-y-6">
                <AppEntitySummary
                    title="Doente"
                    fields={[
                        {
                            label: 'Nome',
                            value: doente?.nome ?? '',
                        },
                        {
                            label: 'PU',
                            value: doente?.pu ?? '',
                        },
                    ]}
                />

                <AppEntitySummary
                    title="Episódio"
                    fields={[
                        {
                            label: 'Tipo',
                            value: episodio?.tipo ?? '',
                        },
                        {
                            label: 'Diagnóstico',
                            value: episodio?.diagnostico ?? '',
                        },
                        {
                            label: 'CID10',
                            value: episodio?.cid10 ?? '',
                        },
                        {
                            label: 'Data diagnóstico',
                            value: episodio?.data_diagnostico ? new Date(episodio.data_diagnostico).toLocaleDateString('pt-PT') : '',
                        },
                        {
                            label: 'Estado',
                            value: episodio?.estado ?? '',
                        },
                    ]}
                />

                <div className="grid gap-6 md:grid-cols-2">
                    <AppInputField
                        label="Data da consulta"
                        type="date"
                        value={form.data_consulta}
                        onChange={(value) => updateField('data_consulta', String(value))}
                        error={errors.data_consulta}
                        required
                    />

                    <AppInputField
                        label="Aptidão"
                        type="text"
                        value={form.aptidao}
                        onChange={(value) => updateField('aptidao', String(value))}
                        error={errors.aptidao}
                    />

                    <AppSelectField
                        label="ASA"
                        value={form.asa}
                        options={[
                            {
                                value: '',
                                label: 'Selecionar',
                            },
                            {
                                value: 'I',
                                label: 'I',
                            },
                            {
                                value: 'II',
                                label: 'II',
                            },
                            {
                                value: 'III',
                                label: 'III',
                            },
                            {
                                value: 'IV',
                                label: 'IV',
                            },
                            {
                                value: 'V',
                                label: 'V',
                            },
                        ]}
                        onChange={(value) => updateField('asa', String(value))}
                        error={errors.asa}
                    />

                    <AppSelectField
                        label="Polo recomendado"
                        value={form.polo_recomendado}
                        options={[
                            {
                                value: '',
                                label: 'Selecionar',
                            },
                            ...poloOptions,
                        ]}
                        onChange={(value) => updateField('polo_recomendado', String(value))}
                        error={errors.polo_recomendado}
                    />

                    <AppCheckboxField label="MFR" checked={form.mfr} onChange={(value) => updateField('mfr', Boolean(value))} error={errors.mfr} />

                    <AppInputField
                        label="Dias de pré-habilitação"
                        type="number"
                        value={form.dias_prehabilitacao}
                        onChange={(value) => updateField('dias_prehabilitacao', String(value))}
                        error={errors.dias_prehabilitacao}
                    />

                    <AppInputField
                        label="Notas"
                        type="text"
                        value={form.notas}
                        onChange={(value) => updateField('notas', String(value))}
                        error={errors.notas}
                    />

                    <AppInputField
                        label="Fonte"
                        type="text"
                        value={form.fonte}
                        onChange={(value) => updateField('fonte', String(value))}
                        error={errors.fonte}
                    />
                </div>
            </div>
        </AppModalForm>
    );
}
function setForm(arg0: {
    episodio_id: number;
    data_consulta: string;
    aptidao: string;
    asa: string;
    polo_recomendado: string;
    mfr: boolean;
    dias_prehabilitacao: string;
    notas: string;
    fonte: string;
}) {
    throw new Error('Function not implemented.');
}
