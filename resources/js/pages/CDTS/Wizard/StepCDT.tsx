import { router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppInputField } from '@/components/app/app-input-field';
import { AppModalForm } from '@/components/app/app-modal-form';
import { AppTextareaField } from '@/components/app/app-textarea-field';

import type { CDT, Doente, Episodio } from './types';

type Props = {
    doente: Doente;
    episodio: Episodio;
    onBack: () => void;
    onSuccess: (cdt: CDT) => void;
};

type FormData = {
    episodio_id: number;
    data_pedido: string;
    data_discussao: string;
    decisao: string;
    estadio_clinico: string;
};

export function StepCDT({ doente, episodio, onBack, onSuccess }: Props) {
    const [form, setForm] = useState<FormData>({
        episodio_id: episodio.id,
        data_pedido: '',
        data_discussao: '',
        decisao: '',
        estadio_clinico: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: '' }));
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrors({});

        router.post('/cdts', form, {
            preserveScroll: true,

            onSuccess: (page) => {
                toast.success('CDT criada com sucesso.');

                const createdCdt = (page.props as { flash?: { created_cdt?: CDT } }).flash?.created_cdt;

                if (createdCdt) {
                    onSuccess(createdCdt);
                }
            },

            onError: (validationErrors: Record<string, string>) => {
                setErrors(validationErrors);
                toast.error('Verifique os dados introduzidos.');
            },

            onFinish: () => setLoading(false),
        });
    };

    const maskedPu = doente.pu.length > 3 ? `********${doente.pu.slice(-3)}` : '********';

    return (
        <AppModalForm
            open
            title="Nova CDT"
            description="Preencha os dados da discussão de caso."
            onClose={onBack}
            onSubmit={submit}
            loading={loading}
            maxWidth="3xl"
            submitLabel="Criar CDT"
        >
            <AppEntitySummary
                title="Doente"
                fields={[
                    { label: 'Nome', value: doente.nome },
                    { label: 'PU', value: maskedPu },
                ]}
            />

            <AppEntitySummary
                title="Episódio"
                fields={[
                    { label: 'Tipo', value: episodio.tipo },
                    { label: 'Diagnóstico', value: episodio.diagnostico },
                    { label: 'CID10', value: episodio.cid10 },
                    { label: 'Data diagnóstico', value: episodio.data_diagnostico },
                    { label: 'Estado', value: episodio.estado },
                ]}
            />

            <div className="grid gap-6 md:grid-cols-2">
                <AppInputField
                    label="Data do pedido"
                    type="date"
                    value={form.data_pedido}
                    onChange={(value) => updateField('data_pedido', value)}
                    error={errors.data_pedido}
                />

                <AppInputField
                    label="Data da discussão"
                    type="date"
                    value={form.data_discussao}
                    onChange={(value) => updateField('data_discussao', value)}
                    error={errors.data_discussao}
                />

                <AppInputField
                    label="Estádio clínico"
                    value={form.estadio_clinico}
                    onChange={(value) => updateField('estadio_clinico', value)}
                    error={errors.estadio_clinico}
                    placeholder="Ex.: II"
                />
            </div>

            <AppTextareaField
                label="Decisão"
                value={form.decisao}
                onChange={(value) => updateField('decisao', value)}
                error={errors.decisao}
            />
        </AppModalForm>
    );
}
