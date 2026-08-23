import { AppPageHeader } from '@/components/app/app-page-header';
import { AppPagination } from '@/components/app/app-pagination';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import CreateOrUpdateCasoPlaneado from './CreateOrUpdateCasoPlaneado';
import type { CasoPlaneado, Slot, User } from './../../types/types';

type CasoPlaneadoItem = {
    id: number;
    slot_id: number;
    episodio_id: number;
    ordem: number;
    procedimento_previsto: string;
    duracao_prevista_min: number;
    anestesia_apto: boolean;
    cama_destino: string;
    internamento_em?: string | null;
    cirurgiao_id: number;
    observacoes: string;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    casosPlaneados: {
        data: CasoPlaneadoItem[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        from?: number | null;
        to?: number | null;
        total?: number | null;
    };
    users: User[];
    slots: Pick<Slot, 'id' | 'nome_slot'>[];
};

type FormData = {
    id: number;
    slot_id: number;
    episodio_id: number;
    ordem: number;
    procedimento_previsto: string;
    duracao_prevista_min: number;
    anestesia_apto: boolean;
    cama_destino: string;
    internamento_em?: string | null;
    cirurgiao_id: number;
    observacoes: string;
};

const breadcrumbs = [{ title: 'CasoPlaneados', href: '/caso-planeados' }];

export default function Index({ casosPlaneados, users, slots }: Props) {
    const [showSlotModal, setShowSlotModal] = useState(false);
    const [editingCasoPlaneado, setEditingCasoPlaneado] = useState<CasoPlaneadoItem | null>(null);

    const columns: AppTableColumn<CasoPlaneadoItem>[] = [
        {
            label: '#',
            key: 'id',
        },

        {
            label: 'Episódio',
            key: 'episodio_id',
        },
        {
            label: 'Slot',
            key: 'slot_id',
            render: (slot) => <span>{slots.find(s => s.id === slot.slot_id)?.nome_slot ?? ''}</span>, // Replace with actual slot name if needed
        },

        {
            label: 'Ordem',
            key: 'ordem',
        },
        {
            label: 'Procedimento Previsto',
            key: 'procedimento_previsto',
        },
        {
            label: 'Duração Prevista (min)',
            key: 'duracao_prevista_min',
        },
        {
            label: 'Anestesia Apto',
            key: 'anestesia_apto',
        },
        {
            label: 'Cama Destino',
            key: 'cama_destino',
        },
        {
            label: 'Internamento Em',
            key: 'internamento_em',
        },
        {
            label: 'Cirurgião ID',
            key: 'cirurgiao_id',
        },
        {
            label: 'Observações',
            key: 'observacoes',
        },
        {
            label: 'Ações',
            key: 'actions',
            render: (casoPlaneado) => (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            setEditingCasoPlaneado(casoPlaneado);
                            setShowSlotModal(true);
                        }}
                    >
                        Editar
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CasoPlaneados" />

            <div className="p-6">
                <AppPageHeader
                    title="CasoPlaneados"
                    description="Gestão e consulta de casos planeados"
                    action={
                        <Button type="button" size="sm" onClick={() => router.get('/caso-planeados/create')}>
                            Novo caso planeado
                        </Button>
                    }
                />
                <AppTable columns={columns} data={casosPlaneados.data} rowKey={(casoPlaneado) => casoPlaneado.id} />
                <AppPagination
                    links={casosPlaneados.links}
                    from={casosPlaneados.from ?? undefined}
                    to={casosPlaneados.to ?? undefined}
                    total={casosPlaneados.total ?? undefined}
                />
            </div>
            {showSlotModal && (
            <CreateOrUpdateCasoPlaneado
                users={users}
                slots={slots}
                casoPlaneado={editingCasoPlaneado ?? null}
                onClose={() => setShowSlotModal(false)}
                onCreated={(casoPlaneado) => {
                    setShowSlotModal(false);
                    setEditingCasoPlaneado(null);
                }}
            />
            )}
        </AppLayout>
    );
}
