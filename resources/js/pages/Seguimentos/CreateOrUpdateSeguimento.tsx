import { AppCheckboxField } from '@/components/app/app-check-box-field';
import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppModalForm } from '@/components/app/app-modal-form';
import { router } from '@inertiajs/react';
import { type FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Option = { label: string; value: string };

type Seguimento = {
    id: number;
    episodio_id: number;
    data_avaliacao: string | null;
    recidiva_local: boolean | null;
    estado_vital: string | null;
    readmissao: boolean | null;
    reoperacao: boolean | null;
    observacoes: string | null;
};

type Props = {
    open: boolean;
    onClose: () => void;
    seguimento: Seguimento | null;
    episodioOptions: Option[];
};

export default function CreateOrUpdateSeguimento({ open, onClose, seguimento, episodioOptions }: Props) {
    const [form, setForm] = useState({
        episodio_id: String(seguimento?.episodio_id ?? ''),
        data_avaliacao: seguimento?.data_avaliacao ?? '',
        recidiva_local: Boolean(seguimento?.recidiva_local),
        estado_vital: seguimento?.estado_vital ?? '',
        readmissao: Boolean(seguimento?.readmissao),
        reoperacao: Boolean(seguimento?.reoperacao),
        observacoes: seguimento?.observacoes ?? '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setForm({
            episodio_id: String(seguimento?.episodio_id ?? ''),
            data_avaliacao: seguimento?.data_avaliacao ?? '',
            recidiva_local: Boolean(seguimento?.recidiva_local),
            estado_vital: seguimento?.estado_vital ?? '',
            readmissao: Boolean(seguimento?.readmissao),
            reoperacao: Boolean(seguimento?.reoperacao),
            observacoes: seguimento?.observacoes ?? '',
        });
        setErrors({});
    }, [seguimento, open]);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrors({});

        const options = {
            onSuccess: () => {
                toast.success(seguimento ? 'Seguimento atualizado com sucesso.' : 'Seguimento criado com sucesso.');
                onClose();
            },
            onError: (validationErrors: Record<string, string>) => setErrors(validationErrors),
            onFinish: () => setLoading(false),
        };

        if (seguimento) {
            router.put(`/seguimentos/${seguimento.id}`, form, options);
        } else {
            router.post('/seguimentos', form, options);
        }
    };

    return (
        <AppModalForm
            open={open}
            title={seguimento ? 'Editar seguimento' : 'Novo seguimento'}
            description="Registe a avaliação de seguimento."
            onClose={onClose}
            onSubmit={submit}
            loading={loading}
            submitLabel={seguimento ? 'Guardar alterações' : 'Criar seguimento'}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <AppSelectField
                    label="Episódio"
                    value={form.episodio_id}
                    onChange={(value) => setForm((current) => ({ ...current, episodio_id: String(value) }))}
                    error={errors.episodio_id}
                    placeholder="Selecione o episódio"
                    options={episodioOptions}
                />
                <AppInputField
                    label="Data de avaliação"
                    type="date"
                    value={form.data_avaliacao}
                    onChange={(value) => setForm((current) => ({ ...current, data_avaliacao: value }))}
                    error={errors.data_avaliacao}
                    required
                />
                <AppInputField
                    label="Estado vital"
                    value={form.estado_vital}
                    onChange={(value) => setForm((current) => ({ ...current, estado_vital: value }))}
                    error={errors.estado_vital}
                    placeholder="Ex.: Vivo"
                />
                <AppInputField
                    label="Observações"
                    value={form.observacoes}
                    onChange={(value) => setForm((current) => ({ ...current, observacoes: value }))}
                    error={errors.observacoes}
                />
                <AppCheckboxField
                    label="Recidiva local"
                    checked={form.recidiva_local}
                    onChange={(value) => setForm((current) => ({ ...current, recidiva_local: value }))}
                    error={errors.recidiva_local}
                />
                <AppCheckboxField
                    label="Readmissão"
                    checked={form.readmissao}
                    onChange={(value) => setForm((current) => ({ ...current, readmissao: value }))}
                    error={errors.readmissao}
                />
                <AppCheckboxField
                    label="Reoperação"
                    checked={form.reoperacao}
                    onChange={(value) => setForm((current) => ({ ...current, reoperacao: value }))}
                    error={errors.reoperacao}
                />
            </div>
        </AppModalForm>
    );
}
