import { AppCheckboxField } from '@/components/app/app-check-box-field';
import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppInputField } from '@/components/app/app-input-field';
import { AppModalForm } from '@/components/app/app-modal-form';
import { AppSelectField } from '@/components/app/app-input-select';
import { router } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type CasoPlaneado = {
    id: number | string;
    procedimento_previsto?: string | null;
    episodio_id?: number | string | null;
};

type AvaliacaoEras = {
    id: number | string;
    data_consulta?: string | null;
    aptidao?: string | null;
};

export type Cirurgia = {
    id: number | string;
    caso_planeado_id?: number | string | null;
    procedimento?: string | null;
    abordagem?: string | null;
    urgencia?: string | null;
    reto?: boolean | null;
    terc_inferior_reto?: boolean | null;
    excisao_mesorrecto?: boolean | null;
    ressecao_curativa?: boolean | null;
    colostomia_definitiva?: boolean | null;
    anastomose?: boolean | null;
    eras_id?: number | string | null;
    observacoes?: string | null;
};

type Props = {
    casoPlaneado: CasoPlaneado | null;

    avaliacaoEras?: AvaliacaoEras | null;

    cirurgia?: Cirurgia | null;

    onClose: () => void;

    onSuccess: (cirurgia: Cirurgia) => void;
};

type FormData = {
    caso_planeado_id: number | string;
    procedimento: string;
    abordagem: string;
    urgencia: string;
    reto: boolean;
    terc_inferior_reto: boolean;
    excisao_mesorrecto: boolean;
    ressecao_curativa: boolean;
    colostomia_definitiva: boolean;
    anastomose: boolean;
    eras_id: number | string;
    observacoes: string;
};

const emptyForm = (
    casoPlaneado?: CasoPlaneado | null,
    avaliacaoEras?: AvaliacaoEras | null,
): FormData => ({
    caso_planeado_id: casoPlaneado?.id ?? '',
    procedimento: casoPlaneado?.procedimento_previsto ?? '',
    abordagem: '',
    urgencia: '',
    reto: false,
    terc_inferior_reto: false,
    excisao_mesorrecto: false,
    ressecao_curativa: false,
    colostomia_definitiva: false,
    anastomose: false,
    eras_id: avaliacaoEras?.id ?? '',
    observacoes: '',
});

export default function CreateOrUpdateCirurgia({
    casoPlaneado,
    avaliacaoEras = null,
    cirurgia = null,
    onClose,
    onSuccess,
}: Props) {
    const isEdit = Boolean(cirurgia);

    const [form, setForm] = useState<FormData>(
        emptyForm(casoPlaneado, avaliacaoEras),
    );

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    /**
     * Inicializar o formulário.
     *
     * Em edição usamos os dados da cirurgia.
     * Em criação usamos o caso planeado e, se existir,
     * a avaliação ERAS associada.
     */
    useEffect(() => {
        if (cirurgia) {
            setForm({
                caso_planeado_id:
                    cirurgia.caso_planeado_id ??
                    casoPlaneado?.id ??
                    '',

                procedimento: cirurgia.procedimento ?? '',

                abordagem: cirurgia.abordagem ?? '',

                urgencia: cirurgia.urgencia ?? '',

                reto: Boolean(cirurgia.reto),

                terc_inferior_reto: Boolean(
                    cirurgia.terc_inferior_reto,
                ),

                excisao_mesorrecto: Boolean(
                    cirurgia.excisao_mesorrecto,
                ),

                ressecao_curativa: Boolean(
                    cirurgia.ressecao_curativa,
                ),

                colostomia_definitiva: Boolean(
                    cirurgia.colostomia_definitiva,
                ),

                anastomose: Boolean(cirurgia.anastomose),

                eras_id:
                    cirurgia.eras_id ??
                    avaliacaoEras?.id ??
                    '',

                observacoes: cirurgia.observacoes ?? '',
            });

            return;
        }

        setForm(emptyForm(casoPlaneado, avaliacaoEras));
    }, [cirurgia, casoPlaneado, avaliacaoEras]);

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

        if (!form.caso_planeado_id) {
            toast.error(
                'É necessário selecionar um caso planeado.',
            );
            return;
        }

        setLoading(true);
        setErrors({});

        const options = {
            preserveScroll: true,

            onSuccess: (page: any) => {
                const createdCirurgia =
                    page.props.flash?.created_cirurgia;

                const updatedCirurgia =
                    page.props.flash?.updated_cirurgia;

                const result =
                    createdCirurgia ?? updatedCirurgia;

                toast.success(
                    isEdit
                        ? 'Cirurgia atualizada com sucesso.'
                        : 'Cirurgia criada com sucesso.',
                );

                if (result) {
                    onSuccess(result);
                } else {
                    onClose();
                }
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

        if (isEdit && cirurgia?.id) {
            router.put(
                `/cirurgias/${cirurgia.id}`,
                form,
                options,
            );
        } else {
            router.post(
                '/cirurgias',
                form,
                options,
            );
        }
    };

    return (
        <AppModalForm
            open
            title={
                isEdit
                    ? 'Editar Cirurgia'
                    : 'Nova Cirurgia'
            }
            description={
                isEdit
                    ? 'Atualize os dados da cirurgia.'
                    : 'Preencha os dados da cirurgia.'
            }
            onClose={onClose}
            onSubmit={submit}
            loading={loading}
            maxWidth="4xl"
            submitLabel={
                isEdit
                    ? 'Guardar alterações'
                    : 'Criar cirurgia'
            }
        >
            <div className="space-y-6">
                {/* Caso planeado */}
                <AppEntitySummary
                    title="Caso planeado"
                    fields={[
                        {
                            label: 'ID',
                            value: casoPlaneado?.id
                                ? String(casoPlaneado.id)
                                : '',
                        },
                        {
                            label: 'Procedimento previsto',
                            value:
                                casoPlaneado?.procedimento_previsto ??
                                '',
                        },
                    ]}
                />

                {/* ERAS */}
                {avaliacaoEras && (
                    <AppEntitySummary
                        title="Avaliação ERAS"
                        fields={[
                            {
                                label: 'Data da consulta',
                                value:
                                    avaliacaoEras.data_consulta
                                        ? new Date(
                                              avaliacaoEras.data_consulta,
                                          ).toLocaleDateString(
                                              'pt-PT',
                                          )
                                        : '',
                            },
                            {
                                label: 'Aptidão',
                                value:
                                    avaliacaoEras.aptidao ??
                                    '',
                            },
                        ]}
                    />
                )}

                {/* Dados principais */}
                <div className="grid gap-6 md:grid-cols-2">
                    <AppInputField
                        label="Procedimento"
                        value={form.procedimento}
                        onChange={(value) =>
                            updateField(
                                'procedimento',
                                String(value),
                            )
                        }
                        error={errors.procedimento}
                        required
                    />

                    <AppSelectField
                        label="Abordagem"
                        value={form.abordagem}
                        onChange={(value) =>
                            updateField(
                                'abordagem',
                                String(value),
                            )
                        }
                        error={errors.abordagem}
                        options={[
                            {
                                value: '',
                                label: 'Selecionar',
                            },
                            {
                                value: 'ABERTA',
                                label: 'Aberta',
                            },
                            {
                                value: 'LAPAROSCOPICA',
                                label: 'Laparoscópica',
                            },
                            {
                                value: 'ROBOTICA',
                                label: 'Robótica',
                            },
                            {
                                value: 'OUTRA',
                                label: 'Outra',
                            },
                        ]}
                    />

                    <AppSelectField
                        label="Urgência"
                        value={form.urgencia}
                        onChange={(value) =>
                            updateField(
                                'urgencia',
                                String(value),
                            )
                        }
                        error={errors.urgencia}
                        options={[
                            {
                                value: '',
                                label: 'Selecionar',
                            },
                            {
                                value: 'ELETIVA',
                                label: 'Eletiva',
                            },
                            {
                                value: 'URGENTE',
                                label: 'Urgente',
                            },
                            {
                                value: 'EMERGENCIA',
                                label: 'Emergência',
                            },
                        ]}
                    />
                </div>

                {/* Características cirúrgicas */}
                <div className="rounded-lg border p-4">
                    <h3 className="mb-4 font-semibold">
                        Características da cirurgia
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2">
                        <AppCheckboxField
                            label="Reto"
                            checked={form.reto}
                            onChange={(value) =>
                                updateField(
                                    'reto',
                                    Boolean(value),
                                )
                            }
                            error={errors.reto}
                        />

                        <AppCheckboxField
                            label="Terço inferior do reto"
                            checked={
                                form.terc_inferior_reto
                            }
                            onChange={(value) =>
                                updateField(
                                    'terc_inferior_reto',
                                    Boolean(value),
                                )
                            }
                            error={
                                errors.terc_inferior_reto
                            }
                        />

                        <AppCheckboxField
                            label="Excisão do mesorreto"
                            checked={
                                form.excisao_mesorrecto
                            }
                            onChange={(value) =>
                                updateField(
                                    'excisao_mesorrecto',
                                    Boolean(value),
                                )
                            }
                            error={
                                errors.excisao_mesorrecto
                            }
                        />

                        <AppCheckboxField
                            label="Ressecção curativa"
                            checked={
                                form.ressecao_curativa
                            }
                            onChange={(value) =>
                                updateField(
                                    'ressecao_curativa',
                                    Boolean(value),
                                )
                            }
                            error={
                                errors.ressecao_curativa
                            }
                        />

                        <AppCheckboxField
                            label="Colostomia definitiva"
                            checked={
                                form.colostomia_definitiva
                            }
                            onChange={(value) =>
                                updateField(
                                    'colostomia_definitiva',
                                    Boolean(value),
                                )
                            }
                            error={
                                errors.colostomia_definitiva
                            }
                        />

                        <AppCheckboxField
                            label="Anastomose"
                            checked={form.anastomose}
                            onChange={(value) =>
                                updateField(
                                    'anastomose',
                                    Boolean(value),
                                )
                            }
                            error={errors.anastomose}
                        />
                    </div>
                </div>

                {/* Observações */}
                <AppInputField
                    label="Observações"
                    value={form.observacoes}
                    onChange={(value) =>
                        updateField(
                            'observacoes',
                            String(value),
                        )
                    }
                    error={errors.observacoes}
                />
            </div>
        </AppModalForm>
    );
}