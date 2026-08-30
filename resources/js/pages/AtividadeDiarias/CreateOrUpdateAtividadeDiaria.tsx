import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppModalForm } from '@/components/app/app-modal-form';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Option = { label: string; value: string };

type Props = {
     open: boolean;
    onClose: () => void;
    atividade?: {
        id: number;
        user_id?: number | null;
        data?: string | null;
        polo?: string | null;
        periodo?: string | null;
        detalhe?: string | null;
        fonte?: string | null;
        tipo?: string | null;
    } | null;
    poloOptions: Option[];
    userOptions: Option[];
    periodoOptions: Option[];
    tipoOptions: Option[];
};

export default function CreateOrUpdateAtividadeDiaria({ open, onClose, atividade, poloOptions, userOptions, periodoOptions, tipoOptions }: Props) {
    const [form, setForm] = useState({
        polo: atividade?.polo ?? '',
        user_id: atividade?.user_id ?? '',
        data: atividade?.data ?? '',
        periodo: atividade?.periodo ?? '',
        detalhe: atividade?.detalhe ?? '',
        fonte: atividade?.fonte ?? '',
        tipo: atividade?.tipo ?? '',
    });

    useEffect(() => {
        setForm({
            polo: atividade?.polo ?? '',
            user_id: atividade?.user_id ?? '',
            data: atividade?.data ?? '',
            periodo: atividade?.periodo ?? '',
            detalhe: atividade?.detalhe ?? '',
            fonte: atividade?.fonte ?? '',
            tipo: atividade?.tipo ?? '',
        });
    }, [atividade]); 

    const [loading, setLoading] = useState(false);

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const submit = async () => {
        setLoading(true);

        const payload = { ...form };

        if (atividade) {
            // Update existing atividade
            router.put(`/atividade-diarias/${atividade.id}`, payload, {
                onSuccess: () => {
                    setLoading(false);
                    toast.success('Actividade Diária atualizada com sucesso');
                    onClose();
                },
                onError: () => {
                    setLoading(false);
                }
            });
        } else {
            // Create new atividade
            router.post('/atividade-diarias', payload, {
                onSuccess: () => {
                    setLoading(false);
                    toast.success('Actividade Diária criada com sucesso');
                    onClose();
                },
                onError: () => {
                    setLoading(false);
                }
            });
        }

        setLoading(false);
        onClose();
    };

    return (
        <AppModalForm
            open={open}
            title={atividade ? "Editar Actividade Diária" : "Nova Actividade Diária"}
            description={atividade ? "Edite os dados da Actividade Diária." : "Preencha os dados da Actividade Diária."}
            onClose={onClose}
            onSubmit={submit}
            loading={loading}
            submitLabel={atividade ? "Atualizar Actividade Diária" : "Criar Actividade Diária"}
        >
            <AppSelectField
                label="Polo"
                value={form.polo}
                onChange={(v) => handleChange('polo', String(v))}
                error=""
                placeholder="Selecione o polo"
                options={poloOptions}
            />

            <AppSelectField
                label="Usuário"
                value={form.user_id}
                onChange={(v) => handleChange('user_id', String(v))}
                error=""
                placeholder="Selecione o usuário"
                options={userOptions}
            />

            <AppInputField
                label="Data"
                value={form.data}
                onChange={(v) => handleChange('data', String(v))}
                error=""
                placeholder="Digite a data"
                type="date"
            />

            <AppSelectField
                label="Período"
                value={form.periodo}
                onChange={(v) => handleChange('periodo', String(v))}
                error=""
                placeholder="Selecione o período"
                options={periodoOptions}
            />

            <AppSelectField
                label="Tipo"
                value={form.tipo}
                onChange={(v) => handleChange('tipo', String(v))}
                error=""
                placeholder="Selecione o tipo"
                options={tipoOptions}
            />

            <AppInputField
                label="Detalhe"
                value={form.detalhe}
                onChange={(v) => handleChange('detalhe', String(v))}
                error=""
                placeholder="Digite o detalhe"
                type="text"
            />

            <AppInputField
                label="Fonte"
                value={form.fonte}
                onChange={(v) => handleChange('fonte', String(v))}
                error=""
                placeholder="Digite a fonte"
                type="text"
            />
        </AppModalForm>
    );
}
