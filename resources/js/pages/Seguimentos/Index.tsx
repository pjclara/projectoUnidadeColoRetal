import { AppPageHeader } from '@/components/app/app-page-header';
import { AppTable, type AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import CreateOrUpdateSeguimento from './CreateOrUpdateSeguimento';

type SeguimentoItem = {
    id: number;
    episodio_id: number;
    episodio?: string | null;
    data_avaliacao: string | null;
    recidiva_local: boolean | null;
    estado_vital: string | null;
    readmissao: boolean | null;
    reoperacao: boolean | null;
    observacoes: string | null;
};

type Option = { label: string; value: string };

type Props = {
    seguimentos: { data: SeguimentoItem[] };
    episodioOptions: Option[];
};

const breadcrumbs = [{ title: 'Seguimentos', href: '/seguimentos' }];

export default function Index({ seguimentos, episodioOptions }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<SeguimentoItem | null>(null);

    const columns: AppTableColumn<SeguimentoItem>[] = [
        { label: 'Episódio', key: 'episodio', render: (item) => item.episodio ?? `#${item.episodio_id}` },
        { label: 'Data de avaliação', key: 'data_avaliacao' },
        { label: 'Estado vital', key: 'estado_vital' },
        { label: 'Recidiva local', key: 'recidiva_local', render: (item) => (item.recidiva_local ? 'Sim' : 'Não') },
        { label: 'Readmissão', key: 'readmissao', render: (item) => (item.readmissao ? 'Sim' : 'Não') },
        { label: 'Reoperação', key: 'reoperacao', render: (item) => (item.reoperacao ? 'Sim' : 'Não') },
        {
            label: 'Ações',
            key: 'actions',
            render: (item) => (
                <div className="flex gap-2">
                    <Button size="sm" onClick={() => { setEditingItem(item); setIsOpen(true); }}>Editar</Button>
                    <Button variant="destructive" size="sm" onClick={() => router.delete(`/seguimentos/${item.id}`)}>Eliminar</Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Seguimentos" />
            <div className="p-6">
                <AppPageHeader
                    title="Seguimento"
                    description="Lista de avaliações de seguimento"
                    action={<Button onClick={() => { setEditingItem(null); setIsOpen(true); }}>Novo seguimento</Button>}
                />
                <AppTable columns={columns} data={seguimentos.data} rowKey={(item) => item.id} />
            </div>
            <CreateOrUpdateSeguimento open={isOpen} onClose={() => setIsOpen(false)} seguimento={editingItem} episodioOptions={episodioOptions} />
        </AppLayout>
    );
}