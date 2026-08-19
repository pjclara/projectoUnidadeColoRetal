import { FormEvent, useState } from 'react';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';

import { AppModalForm } from '@/components/app/app-modal-form';
import { AppFormField } from '@/components/app/app-form-field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import type { Doente, Episodio } from '../types';

type Props = {
    doente: Doente;
    episodio: Episodio | null;
    onBack: () => void;
    onSuccess: () => void;
};

export function EpisodioStep({
    doente,
    episodio,
    onBack,
    onSuccess,
}: Props) {
    const isEdit = !!episodio;

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        tipo: episodio?.tipo ?? '',
        servico: episodio?.servico ?? '',
        iniciado_em: episodio?.iniciado_em ?? '',
        terminado_em: episodio?.terminado_em ?? '',
        motivo: episodio?.motivo ?? '',
    });

    const [errors, setErrors] = useState<
        Record<string, string>
    >({});

    const updateField = (
        field: keyof typeof form,
        value: string,
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

    const submit = (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setLoading(true);
        setErrors({});

        const options = {
            preserveScroll: true,

            onSuccess: () => {
                toast.success(
                    isEdit
                        ? 'Episódio atualizado com sucesso!'
                        : 'Episódio criado com sucesso!',
                );

                onSuccess();
            },

            onError: (
                validationErrors: Record<string, string>,
            ) => {
                setErrors(validationErrors);

                toast.error(
                    'Verifique os dados introduzidos.',
                );
            },

            onFinish: () => {
                setLoading(false);
            },
        };

        if (isEdit) {
            router.put(
                `/episodios/${episodio.id}`,
                {
                    ...form,
                    doente_id: doente.id,
                },
                options,
            );

            return;
        }

        router.post(
            '/episodios',
            {
                ...form,
                doente_id: doente.id,
            },
            options,
        );
    };

    return (
        <div className="space-y-6">
            {/* Doente */}
            <div className="rounded-xl border bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-950">
                <p className="text-sm text-neutral-500">
                    Doente
                </p>

                <h2 className="font-semibold">
                    {doente.nome}
                </h2>

                <p className="text-sm text-neutral-500">
                    PU: {doente.pu}
                </p>
            </div>

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
                        : 'Registe um novo episódio para este doente.'
                }
                onClose={onBack}
                onSubmit={submit}
                loading={loading}
                maxWidth="4xl"
                submitLabel={
                    isEdit
                        ? 'Guardar alterações'
                        : 'Criar episódio'
                }
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <AppFormField
                        label="Tipo de episódio"
                        error={errors.tipo}
                    >
                        <select
                            value={form.tipo}
                            onChange={(event) =>
                                updateField(
                                    'tipo',
                                    event.target.value,
                                )
                            }
                            className="w-full rounded-lg border px-3 py-2"
                        >
                            <option value="">
                                Selecionar
                            </option>

                            <option value="consulta">
                                Consulta
                            </option>

                            <option value="urgencia">
                                Urgência
                            </option>

                            <option value="internamento">
                                Internamento
                            </option>
                        </select>
                    </AppFormField>

                    <AppFormField
                        label="Serviço"
                        error={errors.servico}
                    >
                        <Input
                            value={form.servico}
                            onChange={(event) =>
                                updateField(
                                    'servico',
                                    event.target.value,
                                )
                            }
                            placeholder="Serviço"
                        />
                    </AppFormField>

                    <AppFormField
                        label="Início"
                        error={errors.iniciado_em}
                    >
                        <Input
                            type="datetime-local"
                            value={form.iniciado_em}
                            onChange={(event) =>
                                updateField(
                                    'iniciado_em',
                                    event.target.value,
                                )
                            }
                        />
                    </AppFormField>

                    <AppFormField
                        label="Fim"
                        error={errors.terminado_em}
                    >
                        <Input
                            type="datetime-local"
                            value={form.terminado_em ?? ''}
                            onChange={(event) =>
                                updateField(
                                    'terminado_em',
                                    event.target.value,
                                )
                            }
                        />
                    </AppFormField>

                    <div className="md:col-span-2">
                        <AppFormField
                            label="Motivo"
                            error={errors.motivo}
                        >
                            <textarea
                                value={form.motivo}
                                onChange={(event) =>
                                    updateField(
                                        'motivo',
                                        event.target.value,
                                    )
                                }
                                rows={4}
                                className="w-full rounded-lg border px-3 py-2"
                                placeholder="Motivo do episódio..."
                            />
                        </AppFormField>
                    </div>
                </div>
            </AppModalForm>
        </div>
    );
}