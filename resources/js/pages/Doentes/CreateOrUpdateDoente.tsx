import { AppFormField } from '@/components/app/app-form-field';
import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppModalForm } from '@/components/app/app-modal-form';
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

export default function CreateOrUpdateDoente({ doente, onClose }: Props) {
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
                    toast.success('Doente atualizado com sucesso.');

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
                toast.success('Doente criado com sucesso.');

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
            description={isEdit ? 'Atualize os dados do doente.' : 'Introduza os dados de identificação do doente.'}
            onClose={onClose}
            onSubmit={submit}
            loading={loading}
            maxWidth="5xl"
            submitLabel={isEdit ? 'Guardar alterações' : 'Criar doente'}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <AppInputField
                    label="Nome"
                    value={form.nome}
                    onChange={(value) => updateField('nome', value)}
                    error={errors.nome}
                    placeholder="Nome completo"
                />

                <AppInputField
                    label="PU"
                    error={errors.pu}
                    type="number"
                    value={form.pu}
                    onChange={(value: string | number) => updateField('pu', String(value))}
                    placeholder="Número PU"
                />

                <AppInputField
                    label="Data de nascimento"
                    error={errors.data_nascimento}
                    type="date"
                    value={form.data_nascimento}
                    onChange={(value: string) => updateField('data_nascimento', value)}
                />

                <AppSelectField
                    label="Sexo"
                    value={form.sexo}
                    onChange={(value: string | number) => updateField('sexo', String(value))}
                    error={errors.sexo}
                    options={[
                        { value: '', label: 'Selecionar' },
                        { value: 'M', label: 'Masculino' },
                        { value: 'F', label: 'Feminino' },
                        { value: 'O', label: 'Outro' },
                    ]}
                />
            </div>
        </AppModalForm>
    );
}
