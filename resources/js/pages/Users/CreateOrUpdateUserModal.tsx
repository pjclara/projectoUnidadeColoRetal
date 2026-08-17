import { AppModal } from '@/components/app/app-modal';
import { Button } from '@/components/ui/button';
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

interface FormData {
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
        <AppModal open={open} onClose={onClose} title={isEdit ? 'Editar Utilizador' : 'Criar Utilizador'}>
            <form onSubmit={submit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium">
                            Nome
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={form.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            className="w-full rounded-md border p-2"
                            autoComplete="name"
                        />

                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="abreviatura" className="mb-1 block text-sm font-medium">
                            Abreviatura
                        </label>

                        <input
                            id="abreviatura"
                            type="text"
                            value={form.abreviatura ?? ''}
                            onChange={(e) => updateField('abreviatura', e.target.value)}
                            className="w-full rounded-md border p-2"
                            autoComplete="abreviatura"
                        />

                        {errors.abreviatura && <p className="mt-1 text-sm text-red-600">{errors.abreviatura}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className="w-full rounded-md border p-2"
                            autoComplete="email"
                        />

                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="numero_mecanografico" className="mb-1 block text-sm font-medium">
                            Número Mecanográfico
                        </label>

                        <input
                            id="numero_mecanografico"
                            type="text"
                            value={form.numero_mecanografico}
                            onChange={(e) => updateField('numero_mecanografico', e.target.value)}
                            className="w-full rounded-md border p-2"
                        />

                        {errors.numero_mecanografico && <p className="mt-1 text-sm text-red-600">{errors.numero_mecanografico}</p>}
                    </div>

                    <div>
                        <label htmlFor="categoria" className="mb-1 block text-sm font-medium">
                            Categoria
                        </label>

                        <input
                            id="categoria"
                            type="text"
                            value={form.categoria}
                            onChange={(e) => updateField('categoria', e.target.value)}
                            className="w-full rounded-md border p-2"
                        />

                        {errors.categoria && <p className="mt-1 text-sm text-red-600">{errors.categoria}</p>}
                    </div>

                    <div>
                        <label htmlFor="especialidade" className="mb-1 block text-sm font-medium">
                            Especialidade
                        </label>

                        <input
                            id="especialidade"
                            type="text"
                            value={form.especialidade}
                            onChange={(e) => updateField('especialidade', e.target.value)}
                            className="w-full rounded-md border p-2"
                        />

                        {errors.especialidade && <p className="mt-1 text-sm text-red-600">{errors.especialidade}</p>}
                    </div>

                    {!isEdit && (
                        <div>
                            <label htmlFor="password" className="mb-1 block text-sm font-medium">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={form.password}
                                onChange={(e) => updateField('password', e.target.value)}
                                className="w-full rounded-md border p-2"
                                autoComplete="new-password"
                            />

                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>
                    )}

                    <label className="flex items-center gap-2">
                        <input type="checkbox" checked={form.ativo} onChange={(e) => updateField('ativo', e.target.checked)} />

                        <span>Utilizador ativo</span>
                    </label>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" onClick={onClose} disabled={loading} className="rounded-md border px-4 py-2 disabled:opacity-50">
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'A guardar...' : isEdit ? 'Guardar alterações' : 'Criar utilizador'}
                    </Button>
                </div>
            </form>
        </AppModal>
    );
}
