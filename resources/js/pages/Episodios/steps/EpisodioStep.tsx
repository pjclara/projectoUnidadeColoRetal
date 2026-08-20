import { router } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { AppFormField } from '@/components/app/app-form-field';
import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppModalForm } from '@/components/app/app-modal-form';

import type { Doente, Episodio } from '../types';

type Props = {
    doente: Doente;
    episodio: Episodio | null;
    onBack: () => void;
    onSuccess: () => void;
};

type FormData = {
    tipo: string;
    diagnostico: string;
    cid10: string;
    data_diagnostico: string;
    centro_referencia: boolean;
    pai_entrada: string;
    pai_saida: string;
    motivo_saida: string;
    estado: string;
    observacoes: string;
    user_id: number | null;
};

const emptyForm: FormData = {
    tipo: '',
    diagnostico: '',
    cid10: '',
    data_diagnostico: '',
    centro_referencia: false,
    pai_entrada: '',
    pai_saida: '',
    motivo_saida: '',
    estado: 'ATIVO',
    observacoes: '',
    user_id: null,
};

export function EpisodioStep({
    doente,
    episodio,
    onBack,
    onSuccess,
}: Props) {
    const isEdit = episodio !== null;

    const [form, setForm] = useState<FormData>(emptyForm);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (episodio) {
            setForm({
                tipo: episodio.tipo ?? '',
                diagnostico: episodio.diagnostico ?? '',
                cid10: episodio.cid10 ?? '',
                data_diagnostico: episodio.data_diagnostico ?? '',
                centro_referencia: episodio.centro_referencia ?? false,
                pai_entrada: episodio.pai_entrada ?? '',
                pai_saida: episodio.pai_saida ?? '',
                motivo_saida: episodio.motivo_saida ?? '',
                estado: episodio.estado ?? 'ATIVO',
                observacoes: episodio.observacoes ?? '',
                user_id: episodio.user_id ?? null,
            });
        } else {
            setForm({
                ...emptyForm,
                data_diagnostico: new Date()
                    .toISOString()
                    .split('T')[0],
            });
        }

        setErrors({});
    }, [episodio]);

    const updateField = <K extends keyof FormData>(
        field: K,
        value: FormData[K],
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        setErrors((current) => ({
            ...current,
            [field]: '',
        }));
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        setErrors({});

        const options = {
            preserveScroll: true,

            onSuccess: () => {
                toast.success(
                    isEdit
                        ? 'Episódio atualizado com sucesso.'
                        : 'Episódio criado com sucesso.',
                );

                onSuccess();
            },

            onError: (validationErrors: Record<string, string>) => {
                setErrors(validationErrors);

                toast.error(
                    'Verifique os dados introduzidos.',
                );
            },

            onFinish: () => {
                setLoading(false);
            },
        };

        const payload = {
            doente_id: doente.id,
            ...form,
        };

        if (isEdit) {
            router.put(
                `/episodios/${episodio.id}`,
                payload,
                options,
            );
        } else {
            router.post(
                '/episodios',
                payload,
                options,
            );
        }
    };

    const maskedPu =
        doente.pu && doente.pu.length > 3
            ? `********${doente.pu.slice(-3)}`
            : '********';

    return (
        <AppModalForm
            open
            title={
                isEdit
                    ? 'Editar episódio'
                    : 'Novo episódio'
            }
            description={
                isEdit
                    ? 'Atualize os dados do episódio.'
                    : 'Registe um novo episódio para o doente.'
            }
            onClose={onBack}
            onSubmit={submit}
            loading={loading}
            maxWidth="5xl"
            submitLabel={
                isEdit
                    ? 'Guardar alterações'
                    : 'Criar episódio'
            }
        >
            {/* DOENTE */}
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950">
                <p className="text-sm text-neutral-500">
                    Doente
                </p>

                <p className="text-lg font-semibold">
                    {doente.nome}
                </p>

                <p className="text-sm text-neutral-500">
                    PU: {maskedPu}
                </p>

                <p className="text-sm text-neutral-500">
                    Sexo: {doente.sexo ?? '—'}
                </p>
            </div>

            {/* DADOS DO EPISÓDIO */}
            <div className="grid gap-6 md:grid-cols-2">
                <AppSelectField
                    label="Tipo"
                    value={form.tipo}
                    onChange={(value) =>
                        updateField(
                            'tipo',
                            String(value),
                        )
                    }
                    error={errors.tipo}
                    required
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
                    label="Data do diagnóstico"
                    type="date"
                    value={form.data_diagnostico}
                    onChange={(value) =>
                        updateField(
                            'data_diagnostico',
                            value,
                        )
                    }
                    error={errors.data_diagnostico}
                />

                <AppInputField
                    label="Diagnóstico"
                    value={form.diagnostico}
                    onChange={(value) =>
                        updateField(
                            'diagnostico',
                            value,
                        )
                    }
                    error={errors.diagnostico}
                    placeholder="Diagnóstico"
                />

                <AppInputField
                    label="CID-10"
                    value={form.cid10}
                    onChange={(value) =>
                        updateField(
                            'cid10',
                            value,
                        )
                    }
                    error={errors.cid10}
                    placeholder="Ex.: C18.9"
                />

                <AppSelectField
                    label="Estado"
                    value={form.estado}
                    onChange={(value) =>
                        updateField(
                            'estado',
                            String(value),
                        )
                    }
                    error={errors.estado}
                    required
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

                <AppInputField
                    label="Motivo de saída"
                    value={form.motivo_saida}
                    onChange={(value) =>
                        updateField(
                            'motivo_saida',
                            value,
                        )
                    }
                    error={errors.motivo_saida}
                    placeholder="Motivo de saída"
                />
            </div>

            {/* CENTRO DE REFERÊNCIA */}
            <AppFormField
                label="Centro de referência"
                error={errors.centro_referencia}
            >
                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={form.centro_referencia}
                        onChange={(event) =>
                            updateField(
                                'centro_referencia',
                                event.target.checked,
                            )
                        }
                        className="h-4 w-4 rounded border-neutral-300"
                    />

                    <span className="text-sm">
                        Doente acompanhado por centro de referência
                    </span>
                </label>
            </AppFormField>

            {/* PAI */}
            <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                <h3 className="mb-4 font-semibold">
                    PAI
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                    <AppInputField
                        label="Data de entrada"
                        type="date"
                        value={form.pai_entrada}
                        onChange={(value) =>
                            updateField(
                                'pai_entrada',
                                value,
                            )
                        }
                        error={errors.pai_entrada}
                    />

                    <AppInputField
                        label="Data de saída"
                        type="date"
                        value={form.pai_saida}
                        onChange={(value) =>
                            updateField(
                                'pai_saida',
                                value,
                            )
                        }
                        error={errors.pai_saida}
                    />
                </div>
            </div>

            {/* OBSERVAÇÕES */}
            <AppFormField
                label="Observações"
                error={errors.observacoes}
            >
                <textarea
                    value={form.observacoes}
                    onChange={(event) =>
                        updateField(
                            'observacoes',
                            event.target.value,
                        )
                    }
                    placeholder="Observações adicionais..."
                    className="min-h-32 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-900"
                />
            </AppFormField>
        </AppModalForm>
    );
}