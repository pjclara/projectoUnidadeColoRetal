import { AppFormField } from '@/components/app/app-form-field';
import { AppModalForm } from '@/components/app/app-modal-form';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Doente {
    id: number;
    nome: string;
    pu: string;
    data_nascimento: string | null;
    sexo: string | null;
}

interface Props {
    doente?: Doente | null;
    onClose: () => void;
}

interface FormData extends Record<string, string> {
    nome: string;
    pu: string;
    data_nascimento: string;
    sexo: string;
}

const emptyForm: FormData = {
    nome: '',
    pu: '',
    data_nascimento: '',
    sexo: '',
};


export default function CreateOrUpdateDoente({
    doente,
    onClose,
}: Props) {
    const isEdit = !!doente;

    const [form, setForm] = useState<FormData>(emptyForm);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (doente) {
            setForm({
                nome: doente.nome ?? '',
                pu: doente.pu ?? '',
                data_nascimento: doente.data_nascimento ?? '',
                sexo: doente.sexo ?? '',
            });
        } else {
            setForm({ ...emptyForm });
        }

        setErrors({});
    }, [doente]);

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


        if (isEdit) {
            router.put(`/doentes/${doente.id}`, form, {
                preserveScroll: true,

                onError: (errors) => {
                    setErrors(errors as Record<string, string>);
                    toast.error('Verifique os dados introduzidos.');
                },

                onSuccess: () => {
                    toast.success(
                        'Doente atualizado com sucesso.',
                    );

                    onClose();
                },

                onFinish: () => {
                    setLoading(false);
                },
            });

            return;
        }

        router.post('/doentes', form, {
            preserveScroll: true,

            onError: (errors) => {
                setErrors(errors as Record<string, string>);
                toast.error('Verifique os dados introduzidos.');
            },

            onSuccess: () => {
                toast.success(
                    'Doente criado com sucesso.',
                );

                onClose();
            },

            onFinish: () => {
                setLoading(false);
            },
        });
    };

    return (
        <AppModalForm
            open
            title={isEdit ? 'Editar Doente' : 'Novo Doente'}
            description={
                isEdit
                    ? 'Atualize os dados do doente.'
                    : 'Introduza os dados de identificação do doente.'
            }
            onClose={onClose}
            onSubmit={submit}
            loading={loading}
            maxWidth="5xl"
            submitLabel={
                isEdit
                    ? 'Guardar alterações'
                    : 'Criar doente'
            }
        >
            <div className="grid gap-6 md:grid-cols-2">
                <AppFormField
                    label="Nome"
                    error={errors.nome}
                >
                    <Input
                        value={form.nome}
                        onChange={(event) =>
                            updateField(
                                'nome',
                                event.target.value,
                            )
                        }
                        placeholder="Nome completo"
                    />
                </AppFormField>

                <AppFormField
                    label="PU"
                    error={errors.pu}
                >
                    <Input
                        type="number"
                        value={form.pu}
                        onChange={(event) =>
                            updateField(
                                'pu',
                                event.target.value,
                            )
                        }
                        placeholder="Número PU"
                    />
                </AppFormField>

                <AppFormField
                    label="Data de nascimento"
                    error={errors.data_nascimento}
                >
                    <Input
                        type="date"
                        value={form.data_nascimento}
                        onChange={(event) =>
                            updateField(
                                'data_nascimento',
                                event.target.value,
                            )
                        }
                    />
                </AppFormField>

                <AppFormField
                    label="Sexo"
                    error={errors.sexo}
                >
                    <select
                        value={form.sexo}
                        onChange={(event) =>
                            updateField(
                                'sexo',
                                event.target.value,
                            )
                        }
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                    >
                        <option value="">
                            Selecionar
                        </option>

                        <option value="M">
                            Masculino
                        </option>

                        <option value="F">
                            Feminino
                        </option>

                        <option value="O">
                            Outro
                        </option>
                    </select>
                </AppFormField>
            </div>
        </AppModalForm>
    );
}