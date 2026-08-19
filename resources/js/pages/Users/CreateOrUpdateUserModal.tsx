import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppModalForm } from '@/components/app/app-modal-form';
import { router } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface User {
    id: number;
    name: string;
    abreviatura?: string | null;
    email: string;
    numero_mecanografico?: string | null;
    categoria?: string | null;
    especialidade?: string | null;
    ativo: boolean;
}

interface Props {
    open: boolean;
    onClose: () => void;
    user?: User | null;
}

interface FormData extends Record<string, string | boolean> {
    abreviatura: string;
    name: string;
    email: string;
    numero_mecanografico: string;
    categoria: string;
    especialidade: string;
    ativo: boolean;
    password: string;
}

const emptyForm: FormData = {
    abreviatura: '',
    name: '',
    email: '',
    numero_mecanografico: '',
    categoria: '',
    especialidade: '',
    ativo: true,
    password: '',
};

export default function CreateOrUpdateUserModal({ open, onClose, user }: Props) {
    const isEdit = user !== null && user !== undefined;

    const [form, setForm] = useState<FormData>(emptyForm);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!open) {
            return;
        }

        if (user) {
            setForm({
                abreviatura: user.abreviatura ?? '',
                name: user.name ?? '',
                email: user.email ?? '',
                numero_mecanografico: user.numero_mecanografico ?? '',
                categoria: user.categoria ?? '',
                especialidade: user.especialidade ?? '',
                ativo: user.ativo ?? true,
                password: '',
            });
        } else {
            setForm({ ...emptyForm });
        }

        setErrors({});
    }, [open, user]);

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

        if (isEdit && !user) {
            setLoading(false);
            return;
        }

        const url = isEdit ? `/users/${user.id}` : '/users';

        const options = {
            onError: (formErrors: Record<string, string>) => {
                setErrors(formErrors);
                toast.error('Erro ao guardar o utilizador.');
            },

            onFinish: () => {
                setLoading(false);
            },

            onSuccess: () => {
                onClose();

                toast.success(isEdit ? 'Utilizador atualizado com sucesso.' : 'Utilizador criado com sucesso.');
            },
        };

        if (isEdit) {
            router.put(url, form, options);
        } else {
            router.post(url, form, options);
        }
    };

    if (!open) {
        return null;
    }

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
                    value={form.name}
                    onChange={(value) => updateField('name', value)}
                    error={errors.name}
                    placeholder="Nome completo"
                />

                <AppInputField
                    label="Abreviatura"
                    value={form.abreviatura}
                    onChange={(value) => updateField('abreviatura', value)}
                    error={errors.abreviatura}
                    placeholder="Abreviatura"
                />

                <AppInputField
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(value) => updateField('email', value)}
                    error={errors.email}
                    placeholder="Email"
                />

                <AppInputField
                    label="Número mecanográfico"
                    type="number"
                    value={form.numero_mecanografico}
                    onChange={(value) => updateField('numero_mecanografico', value)}
                    error={errors.numero_mecanografico}
                    placeholder="Número mecanográfico"
                />

                <AppSelectField
                    label="Categoria"
                    value={form.categoria}
                    onChange={(value: string | number) => updateField('categoria', String(value))}
                    error={errors.categoria}
                    options={[
                        { value: '', label: 'Selecionar' },
                        { value: 'Medico', label: 'Médico' },
                        { value: 'Enfermeiro', label: 'Enfermeiro' },
                        { value: 'Administrativo', label: 'Administrativo' },
                        { value: 'Outro', label: 'Outro' },
                    ]}
                />

                <AppSelectField
                    label="Especialidade"
                    value={form.especialidade}
                    onChange={(value: string | number) => updateField('especialidade', String(value))}
                    error={errors.especialidade}
                    options={[
                        { value: '', label: 'Selecionar' },
                        { value: 'Cirurgia', label: 'Cirurgia' },
                        { value: 'Anestesista', label: 'Anestesista' },
                        { value: 'Outro', label: 'Outro' },
                    ]}
                />
            </div>
        </AppModalForm>
    );
}
