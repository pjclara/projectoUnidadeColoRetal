import { AppPageHeader } from '@/components/app/app-page-header';
import { AppTable, type AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import CreateOrUpdateCirurgia, { type Cirurgia } from './CreateOrUpdateCirurgia';

type CirurgiaItem = Cirurgia & {
    id: number;
    caso_planeado_id: number | null;
    doente?: { nome: string; pu: string } | null;
    episodio?: { id: number; diagnostico: string | null } | null;
};

type Props = {
    cirurgias: { data: CirurgiaItem[] };
};

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Cirurgias', href: '/cirurgias' }];

export default function Index({ cirurgias }: Props) {
    const [editing, setEditing] = useState<CirurgiaItem | null>(null);

    const columns: AppTableColumn<CirurgiaItem>[] = [
        {
            label: 'Doente',
            key: 'doente',
            render: (cirurgia) => cirurgia.doente ? (
                <div>
                    <div className="font-medium">{cirurgia.doente.nome}</div>
                    <div className="text-xs text-muted-foreground">PU: {cirurgia.doente.pu}</div>
                </div>
            ) : '—',
        },
        { label: 'Diagnóstico', key: 'episodio', render: (cirurgia) => cirurgia.episodio?.diagnostico ?? '—' },
        { label: 'Procedimento', key: 'procedimento', render: (cirurgia) => cirurgia.procedimento ?? '—' },
        { label: 'Abordagem', key: 'abordagem', render: (cirurgia) => cirurgia.abordagem ?? '—' },
        { label: 'Urgência', key: 'urgencia', render: (cirurgia) => cirurgia.urgencia ? 'Sim' : 'Não' },
        {
            label: 'Ações',
            key: 'actions',
            className: 'text-right',
            render: (cirurgia) => (
                <div className="flex justify-end gap-2">
                    <Button size="sm" onClick={() => setEditing(cirurgia)}>Editar</Button>
                    <Button size="sm" variant="destructive" onClick={() => router.delete(`/cirurgias/${cirurgia.id}`)}>Eliminar</Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cirurgias" />
            <div className="p-6">
                <AppPageHeader
                    title="Cirurgias"
                    description="Gestão e consulta de cirurgias"
                    action={<Button onClick={() => router.get('/cirurgias/create')}>Nova cirurgia</Button>}
                />
                <AppTable columns={columns} data={cirurgias.data} rowKey={(cirurgia) => cirurgia.id} />
            </div>

            {editing && (
                <CreateOrUpdateCirurgia
                    casoPlaneado={editing.caso_planeado_id ? { id: editing.caso_planeado_id, procedimento_previsto: editing.procedimento } : null}
                    cirurgia={editing}
                    onClose={() => setEditing(null)}
                    onSuccess={() => setEditing(null)}
                />
            )}
        </AppLayout>
    );
}
