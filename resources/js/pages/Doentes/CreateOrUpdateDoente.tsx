import { AppModalForm } from '@/components/app/app-modal-form';
import { router } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { DoenteForm } from './DoenteForm';

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
    endpoint?: string;
    onCreated?: (doente: Doente) => void;
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

export default function CreateOrUpdateDoente({ doente, onClose, endpoint = '/doentes', onCreated }: Props) {
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

        router.post(endpoint, form, {
            preserveScroll: true,

            onError: (errors) => {
                setErrors(errors as Record<string, string>);
                toast.error('Verifique os dados introduzidos.');
            },

            onSuccess: (page) => {
                toast.success('Doente criado com sucesso.');

                const createdDoente = (
                    page.props as {
                        flash?: { created_doente?: Doente };
                    }
                ).flash?.created_doente;

                if (createdDoente && onCreated) {
                    onCreated(createdDoente);
                } else {
                    onClose();
                }
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
            description={isEdit ? 'Atualize os dados do doente.' : 'Introduza os dados do doente.'}
            onClose={onClose}
            onSubmit={submit}
            loading={loading}
            maxWidth="3xl"
            submitLabel={isEdit ? 'Guardar alterações' : 'Criar doente'}
        >
            <DoenteForm form={form} errors={errors} onChange={updateField} disabled={loading} />
        </AppModalForm>
    );
}
