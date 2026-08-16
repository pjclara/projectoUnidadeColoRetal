import { FormEvent, useEffect, useState } from "react";
import { router } from "@inertiajs/react";

interface User {
    id: number;
    name: string;
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
    name: string;
    email: string;
    numero_mecanografico: string;
    categoria: string;
    especialidade: string;
    ativo: boolean;
    password: string;
}

const emptyForm: FormData = {
    name: "",
    email: "",
    numero_mecanografico: "",
    categoria: "",
    especialidade: "",
    ativo: true,
    password: "",
};

export default function CreateOrUpdateUserModal({
    open,
    onClose,
    user = null,
}: Props) {
    const isEdit = user !== null;

    const [form, setForm] = useState<FormData>(emptyForm);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!open) {
            return;
        }

        if (user) {
            setForm({
                name: user.name ?? "",
                email: user.email ?? "",
                numero_mecanografico: user.numero_mecanografico ?? "",
                categoria: user.categoria ?? "",
                especialidade: user.especialidade ?? "",
                ativo: user.ativo ?? true,
                password: "",
            });
        } else {
            setForm(emptyForm);
        }

        setErrors({});
    }, [open, user]);

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
            [field]: "",
        }));
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        setErrors({});

        const url = isEdit
            ? `/admin/users/${user.id}`
            : "/admin/users";

        const options = {
            onError: (formErrors: Record<string, string>) => {
                setErrors(formErrors);
            },
            onFinish: () => {
                setLoading(false);
            },
            onSuccess: () => {
                onClose();
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
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-modal-title"
        >
            <div className="w-full max-w-xl rounded-2xl border border-neutral-300/40 bg-white p-6 shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
                <div className="mb-6 flex items-center justify-between">
                    <h2
                        id="user-modal-title"
                        className="text-xl font-semibold"
                    >
                        {isEdit
                            ? "Editar Utilizador"
                            : "Criar Utilizador"}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        Fechar
                    </button>
                </div>

                <form onSubmit={submit}>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block text-sm font-medium"
                            >
                                Nome
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={form.name}
                                onChange={(e) =>
                                    updateField("name", e.target.value)
                                }
                                className="w-full rounded-md border p-2"
                                autoComplete="name"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-sm font-medium"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    updateField("email", e.target.value)
                                }
                                className="w-full rounded-md border p-2"
                                autoComplete="email"
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="numero_mecanografico"
                                className="mb-1 block text-sm font-medium"
                            >
                                Número Mecanográfico
                            </label>

                            <input
                                id="numero_mecanografico"
                                type="text"
                                value={form.numero_mecanografico}
                                onChange={(e) =>
                                    updateField(
                                        "numero_mecanografico",
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-md border p-2"
                            />

                            {errors.numero_mecanografico && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.numero_mecanografico}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="categoria"
                                className="mb-1 block text-sm font-medium"
                            >
                                Categoria
                            </label>

                            <input
                                id="categoria"
                                type="text"
                                value={form.categoria}
                                onChange={(e) =>
                                    updateField("categoria", e.target.value)
                                }
                                className="w-full rounded-md border p-2"
                            />

                            {errors.categoria && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.categoria}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="especialidade"
                                className="mb-1 block text-sm font-medium"
                            >
                                Especialidade
                            </label>

                            <input
                                id="especialidade"
                                type="text"
                                value={form.especialidade}
                                onChange={(e) =>
                                    updateField(
                                        "especialidade",
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-md border p-2"
                            />

                            {errors.especialidade && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.especialidade}
                                </p>
                            )}
                        </div>

                        {!isEdit && (
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    value={form.password}
                                    onChange={(e) =>
                                        updateField(
                                            "password",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border p-2"
                                    autoComplete="new-password"
                                />

                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        )}

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={form.ativo}
                                onChange={(e) =>
                                    updateField("ativo", e.target.checked)
                                }
                            />

                            <span>Utilizador ativo</span>
                        </label>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-md border px-4 py-2 disabled:opacity-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading
                                ? "A guardar..."
                                : isEdit
                                  ? "Guardar alterações"
                                  : "Criar utilizador"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}