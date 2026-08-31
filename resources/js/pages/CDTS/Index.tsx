import { AppPageHeader } from '@/components/app/app-page-header';
import { AppPagination } from '@/components/app/app-pagination';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ModalEditCDT from './ModalEditCDT';

type FormData = {
    id: number;
    data_pedido: string;
    data_discussao: string;
    estadio_clinico: string | number;
    decisao: string;
};

type CDTItem = {
    id: number;
    doente?: {
        id: number;
        nome: string;
        pu: string;
    } | null;
    episodio_id: number;
    data_pedido?: string | null;
    data_discussao?: string | null;
    decisao?: string | null;
    estadio_clinico?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    cdts: {
        data: CDTItem[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        from?: number | null;
        to?: number | null;
        total?: number | null;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'CDTs', href: '/cdts' },
];

export default function Index({ cdts }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<FormData>({
        id: 0,
        data_pedido: '',
        data_discussao: '',
        estadio_clinico: '',
        decisao: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);


    function normalizeDate(date: string | null | undefined) {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        return d.toISOString().slice(0, 10);
    }

    function openEditModal(cdt: CDTItem) {
        setEditingId(cdt.id);

        setForm({
            id: cdt.id,
            data_pedido: normalizeDate(cdt.data_pedido),
            data_discussao: normalizeDate(cdt.data_discussao),
            estadio_clinico: cdt.estadio_clinico ?? '',
            decisao: cdt.decisao ?? '',
        });

        setErrors({});
        setModalOpen(true);
    }

    const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: '' }));
    };

    function submitEdit() {
        if (!editingId) return;

        setSaving(true);

        router.put(`/cdts/${editingId}`, form, {
            preserveScroll: true,

            onSuccess: () => {
                toast.success('CDT atualizada com sucesso.');
                setModalOpen(false);
            },

            onError: (validationErrors) => {
                setErrors(validationErrors as Record<string, string>);
                toast.error('Verifique os dados introduzidos.');
            },

            onFinish: () => setSaving(false),
        });
    }

    const columns: AppTableColumn<CDTItem>[] = [
        {
            key: 'utente',
            label: 'Utente',
            render: (cdt) => (
                <div>
                    {cdt.doente ? (
                        <div>
                            <div className="font-medium">{cdt.doente.nome}</div>
                            <div className="text-sm text-gray-500">{cdt.doente.pu}</div>
                        </div>
                    ) : (
                        <span className="text-gray-500">Sem doente associado</span>
                    )}
                </div>
            ),
        },
        { key: 'data_pedido', label: 'Data Pedido' },
        { key: 'data_discussao', label: 'Data Discussão' },
        { key: 'decisao', label: 'Decisão' },
        { key: 'estadio_clinico', label: 'Estádio Clínico' },

        {
            key: 'acoes',
            label: 'Ações',
            className: 'text-right',
            render: (cdt) => (
                <div className="flex justify-end gap-2">
                    <Button size="sm" onClick={() => openEditModal(cdt)}>
                        Editar
                    </Button>

                    <Button className="bg-green-500" size="sm" onClick={() => router.get(`/cdts/${cdt.id}`)}>
                        Ver
                    </Button>

                    <Button size="sm" variant="destructive" onClick={() => router.delete(`/cdts/${cdt.id}`)}>
                        Eliminar
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Consulta de Decisão terapêutica" />

            <div className="p-6">
                <AppPageHeader
                    title="CDTs"
                    description="Gestão e consulta de CDTs"
                    action={<Button onClick={() => router.get('/cdts/create')}>Novo CDT</Button>}
                />

                <AppTable columns={columns} data={cdts.data} rowKey={(cdt) => cdt.id} />

                <AppPagination
                    links={cdts.links}
                    from={cdts.from ?? undefined}
                    to={cdts.to ?? undefined}
                    total={cdts.total ?? undefined}
                />
            </div>

            <ModalEditCDT
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                cdt={form}
                errors={errors}
                onFieldChange={updateField}
                onSubmit={submitEdit}
                processing={saving}
            />
        </AppLayout>
    );
}
