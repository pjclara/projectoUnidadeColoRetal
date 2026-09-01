import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import toast from 'react-hot-toast';

type CrudMethod = 'post' | 'put' | 'patch';

type SubmitOptions = {
    method: CrudMethod;
    url: string;
    successMessage: string;
    errorMessage?: string;
    onSuccess?: () => void;
};

/**
 * Centraliza o ciclo comum dos formulários CRUD com Inertia:
 * estado, erros de validação, submissão e notificações.
 */
export function useCrudForm<T extends Record<string, string | number | boolean | null>>(initialValues: T) {
    const form = useForm<T>(initialValues);

    const updateField = <K extends keyof T>(field: K, value: T[K]) => {
        form.setData(field, value);
        form.clearErrors(field);
    };

    const submit = (event: FormEvent<HTMLFormElement>, options: SubmitOptions) => {
        event.preventDefault();

        const callbacks = {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(options.successMessage);
                options.onSuccess?.();
            },
            onError: () => {
                toast.error(options.errorMessage ?? 'Verifique os dados introduzidos.');
            },
        };

        if (options.method === 'put') {
            form.put(options.url, callbacks);
            return;
        }

        if (options.method === 'patch') {
            form.patch(options.url, callbacks);
            return;
        }

        form.post(options.url, callbacks);
    };

    return {
        form: form.data,
        errors: form.errors,
        loading: form.processing,
        updateField,
        reset: form.reset,
        setForm: form.setData,
        submit,
    };
}
