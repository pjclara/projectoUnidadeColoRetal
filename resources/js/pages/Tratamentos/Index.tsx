import { AppPageHeader } from '@/components/app/app-page-header';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import ModalEditTratamento from './ModalEditTratamento';
import toast from 'react-hot-toast';
type FormData = {
    id: number;
    episodio_id: number;
    tipo: string;
    data_proposta: string;
    data_inicio: string;
    data_fim: string;
    intencao: string;
    observacoes: string;
};

type TratamentoItem = {
    id: number;
    episodio_id: number;
    tipo: string;
    data_proposta?: string | null;
    data_inicio?: string | null;
    data_fim?: string | null;
    intencao?: string | null;
    observacoes?: string | null;
    doente?: {
        nome: string;
        pu: string;
    } | null;
};

type Props = {
    tratamentos: {
        data: TratamentoItem[];
    };
};

const breadcrumbs = [{ title: 'Tratamentos', href: '/tratamentos' }];

export default function Index({ tratamentos }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<FormData>({
        id: 0,
        episodio_id: 0,
        tipo: '',
        data_proposta: '',
        data_inicio: '',
        data_fim: '',
        intencao: '',
        observacoes: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);

    function normalizeDate(date: string | null | undefined) {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        return d.toISOString().slice(0, 10);
    }

    function openEditModal(tratamento: TratamentoItem) {
        setEditingId(tratamento.id);
        setForm({
            id: tratamento.id,
            episodio_id: tratamento.episodio_id,
            tipo: tratamento.tipo,
            data_proposta: normalizeDate(tratamento.data_proposta),
            data_inicio: normalizeDate(tratamento.data_inicio),
            data_fim: normalizeDate(tratamento.data_fim),
            intencao: tratamento.intencao || '',
            observacoes: tratamento.observacoes || '',
        });
        setModalOpen(true);
    }

    const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: '' }));
    };

    function submitEdit() {
        if (!editingId) return;

        setSaving(true);

        router.put(`/tratamentos/${editingId}`, form, {
            preserveScroll: true,
            onSuccess: () => {
                setModalOpen(false);
                setEditingId(null);
                setForm({
                    id: 0,
                    episodio_id: 0,
                    tipo: '',
                    data_proposta: '',
                    data_inicio: '',
                    data_fim: '',
                    intencao: '',
                    observacoes: '',
                });
                setErrors({});
                toast.success('Tratamento atualizado com sucesso!');
            },
            onError: (validationErrors: Record<string, string>) => {
                setErrors(validationErrors);
                toast.error('Erro ao atualizar o tratamento. Verifique os campos e tente novamente.');
            },
            onFinish: () => setSaving(false),
        });
    }

    const columns: AppTableColumn<TratamentoItem>[] = [
        { label: '#', key: 'id' },
        { label: 'Utente', key: 'utente',             
            render: (tratamento) => (
                <div>
                    {tratamento.doente ? (
                        <div>
                            <div className="font-medium">{tratamento.doente.nome}</div>
                            <div className="text-sm text-gray-500">{tratamento.doente.pu}</div>
                        </div>
                    ) : (
                        <span className="text-gray-500">Sem doente associado</span>
                    )}
                </div>
            ),
        },
        { label: 'Tipo', key: 'tipo' },
        { label: 'Data Proposta', key: 'data_proposta' },
        { label: 'Data Início', key: 'data_inicio' },
        { label: 'Data Fim', key: 'data_fim' },
        { label: 'Intenção', key: 'intencao' },
        { label: 'Observações', key: 'observacoes' },
        {
            key: 'acoes',
            label: 'Ações',
            className: 'text-right',
            render: (tratamento) => (
                <div className="flex justify-end gap-2">
                    <Button size="sm" onClick={() => openEditModal(tratamento)}>
                        Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => router.delete(`/tratamentos/${tratamento.id}`)}>
                        Eliminar
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tratamentos" />

            <div className="p-6">
                <AppPageHeader
                    title="Tratamentos"
                    description="Gestão e consulta de tratamentos"
                    action={<Button onClick={() => router.get('/tratamentos/create')}>Novo Tratamento</Button>}
                />

                <AppTable columns={columns} data={tratamentos.data} rowKey={(tratamento) => tratamento.id} />

                <ModalEditTratamento
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    form={form}
                    errors={errors}
                    saving={saving}
                    updateField={updateField}
                    submitEdit={submitEdit}
                />
            </div>
        </AppLayout>
    );
}
