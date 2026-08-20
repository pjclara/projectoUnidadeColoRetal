import { AppModal } from '@/components/app/app-modal';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import {
    EpisodioForm,
    type EpisodioFormData,
} from './EpisodioForm';

type Episodio = {
    id: string | number;
    doente_id?: string | number | null;
    tipo?: string | null;
    diagnostico?: string | null;
    cid10?: string | null;
    data_diagnostico?: string | null;
    centro_referencia?: boolean | null;
    pai_entrada?: string | null;
    pai_saida?: string | null;
    motivo_saida?: string | null;
    user_id?: string | number | null;
    estado?: string | null;
    observacoes?: string | null;
};

type Profissional = {
    id: number;
    name: string;
};

type Props = {
    episodio?: Episodio | null;
    profissionais?: Profissional[];
    onClose: () => void;
    doenteId?: string | number;
    endpoint?: string;
    onCreated?: (episodio: Episodio) => void;
};

const emptyForm: EpisodioFormData = {
    tipo: '',
    diagnostico: '',
    cid10: '',
    data_diagnostico: '',
    centro_referencia: false,
    pai_entrada: '',
    pai_saida: '',
    motivo_saida: '',
    user_id: '',
    estado: 'ATIVO',
    observacoes: '',
};

export default function CreateOrUpdateEpisodio({
    episodio = null,
    profissionais = [],
    onClose,
    doenteId,
    endpoint = '/episodios',
    onCreated,
}: Props) {
    const isEdit = episodio !== null;

    const [form, setForm] =
        useState<EpisodioFormData>(emptyForm);

    const [errors, setErrors] =
        useState<Record<string, string>>({});

    const [loading, setLoading] =
        useState(false);

    /*
     * Inicializar formulário quando abrimos
     * para criar/editar.
     */
    useEffect(() => {
        setForm({
            tipo: episodio?.tipo ?? '',
            diagnostico: episodio?.diagnostico ?? '',
            cid10: episodio?.cid10 ?? '',
            data_diagnostico:
                episodio?.data_diagnostico ?? '',
            centro_referencia:
                episodio?.centro_referencia ?? false,
            pai_entrada:
                episodio?.pai_entrada ?? '',
            pai_saida:
                episodio?.pai_saida ?? '',
            motivo_saida:
                episodio?.motivo_saida ?? '',
            user_id:
                episodio?.user_id ?? '',
            estado:
                episodio?.estado ?? 'ATIVO',
            observacoes:
                episodio?.observacoes ?? '',
        });

        setErrors({});
    }, [episodio]);

    /*
     * Atualização genérica dos campos.
     */
    const updateField = <
        K extends keyof EpisodioFormData
    >(
        field: K,
        value: EpisodioFormData[K],
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

    const submit = () => {
        setLoading(true);
        setErrors({});

        const options = {
            preserveScroll: true,

            onSuccess: (page: any) => {
                if (isEdit) {
                    toast.success(
                        'Episódio atualizado com sucesso!',
                    );

                    onClose();

                    return;
                }

                toast.success(
                    'Episódio criado com sucesso!',
                );

                const createdEpisodio =
                    page.props?.flash?.created_episodio;

                if (
                    createdEpisodio &&
                    onCreated
                ) {
                    onCreated(createdEpisodio);
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

        /*
         * IMPORTANTE:
         * doente_id não está no EpisodioForm porque
         * normalmente já vem selecionado pelo Wizard.
         */
        const payload = {
            ...form,
            doente_id:
                episodio?.doente_id ??
                doenteId ??
                null,
        };

        if (isEdit) {
            router.put(
                `/episodios/${episodio.id}`,
                payload,
                options,
            );

            return;
        }

        router.post(
            endpoint,
            payload,
            options,
        );
    };

    return (
        <AppModal
            open
            onClose={onClose}
            title={
                isEdit
                    ? 'Editar Episódio'
                    : 'Criar Episódio'
            }
            maxWidth="5xl"
        >
            <div className="space-y-6">

                <EpisodioForm
                    form={form}
                    errors={errors}
                    profissionais={profissionais}
                    onChange={updateField}
                />

                <div className="flex justify-end gap-3 border-t pt-6">

                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="button"
                        onClick={submit}
                        disabled={loading}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                        {loading
                            ? 'A guardar...'
                            : isEdit
                              ? 'Guardar alterações'
                              : 'Criar episódio'}
                    </Button>

                </div>
            </div>
        </AppModal>
    );
}