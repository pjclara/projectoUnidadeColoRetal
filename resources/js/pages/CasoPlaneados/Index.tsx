import { AppPageHeader } from '@/components/app/app-page-header';
import { AppPagination } from '@/components/app/app-pagination';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

import type { CasoEquipa, Slot, User} from './../../types/types';

import CreateOrUpdateCasoPlaneado from './CreateOrUpdateCasoPlaneado';
import CreateOrUpdateCasoEquipa from '../CasoEquipas/CreateOrUpdateCasoEquipa';

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

    casos_equipas?: CasoEquipa[] | null;
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

    equipas: CasoEquipa[] | null;
};

const breadcrumbs = [
    {
        title: 'Casos Planeados',
        href: '/caso-planeados',
    },
];

export default function Index({ casosPlaneados, users, slots, equipas }: Props) {
    const [showCasoPlaneadoModal, setShowCasoPlaneadoModal] = useState(false);

    const [showEquipaModal, setShowEquipaModal] = useState(false);

    const [editingCasoPlaneado, setEditingCasoPlaneado] = useState<CasoPlaneadoItem | null>(null);

    const [selectedCasoEquipa, setSelectedCasoEquipa] = useState<CasoPlaneadoItem | null>(null);

    const [casoEquipaCaso, setCasoEquipaCaso] = useState<CasoPlaneadoItem | null>(null);

    /**
     * Abre o modal para editar um Caso Planeado.
     */
    const editarCasoPlaneado = (casoPlaneado: CasoPlaneadoItem) => {
        setEditingCasoPlaneado(casoPlaneado);

        setShowCasoPlaneadoModal(true);
    };

    /**
     * Abre o modal para gerir as equipas
     * associadas ao Caso Planeado.
     */
    const gerirEquipas = (casoPlaneado: CasoPlaneadoItem) => {
        setSelectedCasoEquipa(casoPlaneado);

        setShowEquipaModal(true);
    };

    /**
     * Fecha o modal de equipas.
     */
    const fecharEquipas = () => {
        setShowEquipaModal(false);

        setSelectedCasoEquipa(null);
    };

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

            render: (casoPlaneado) => <span>{slots.find((slot) => slot.id === casoPlaneado.slot_id)?.nome_slot ?? '—'}</span>,
        },

        {
            label: 'Ordem',
            key: 'ordem',
        },

        {
            label: 'Procedimento',
            key: 'procedimento_previsto',
        },

        {
            label: 'Duração',
            key: 'duracao_prevista_min',

            render: (casoPlaneado) => <span>{casoPlaneado.duracao_prevista_min} min</span>,
        },

        {
            label: 'Anestesia',
            key: 'anestesia_apto',

            render: (casoPlaneado) => (
                <span className={casoPlaneado.anestesia_apto ? 'font-medium text-green-600' : 'font-medium text-red-600'}>
                    {casoPlaneado.anestesia_apto ? 'Apto' : 'Não apto'}
                </span>
            ),
        },

        {
            label: 'Cama',
            key: 'cama_destino',
        },

        {
            label: 'Internamento',
            key: 'internamento_em',

            render: (casoPlaneado) => casoPlaneado.internamento_em ?? '—',
        },

        {
            label: 'Equipas',
            key: 'casos_equipas',

            render: (casoPlaneado) => {
                const equipas = casoPlaneado.casos_equipas ?? [];

                if (equipas.length === 0) {
                    return <span className="text-sm text-neutral-400">Sem equipas</span>;
                }

                return (
                    <div className="flex flex-wrap gap-1">
                        {equipas.map((casoEquipa) => (
                            <span key={casoEquipa.caso_planeado_id} className="rounded bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800">
                                {casoEquipa.user ?? 'Unknown User'} — {casoEquipa.funcao ?? 'Sem função'}
                            </span>
                        ))}
                    </div>
                );
            },
        },

        {
            label: 'Ações',
            key: 'actions',

            className: 'text-right',

            render: (casoPlaneado) => (
                <div className="flex justify-end gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            setCasoEquipaCaso(casoPlaneado);
                        }}
                    >
                        Gerir equipa
                    </Button>

                    <Button size="sm" variant="outline" onClick={() => editarCasoPlaneado(casoPlaneado)}>
                        Editar
                    </Button>

                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => router.get(`/caso-planeados/${casoPlaneado.id}`)}>
                        Ver
                    </Button>
                </div>
            ),
        },
    ];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Casos Planeados" />

            <div className="p-6">
                <AppPageHeader
                    title="Casos Planeados"
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

            {/* ================================
                MODAL CASO PLANEADO
            ================================= */}
            {showCasoPlaneadoModal && (
                <CreateOrUpdateCasoPlaneado
                    users={users}
                    slots={slots}
                    casoPlaneado={editingCasoPlaneado}
                    onClose={() => {
                        setShowCasoPlaneadoModal(false);

                        setEditingCasoPlaneado(null);
                    }}
                    onCreated={() => {
                        setShowCasoPlaneadoModal(false);

                        setEditingCasoPlaneado(null);
                    }}
                />
            )}

            {/* ================================
                MODAL EQUIPAS
            ================================= */}
            {casoEquipaCaso && (
                <CreateOrUpdateCasoEquipa
                    open
                    casoPlaneadoId={casoEquipaCaso.id}
                    users={users}
                    casoEquipas={
                        (casoEquipaCaso.casos_equipas ?? []).map((ce) => ({
                            ...ce,
                            user_id: ce.user ?? 0,
                        })) as never
                    }
                    onClose={() => setCasoEquipaCaso(null)}
                    onSuccess={() => {
                        setCasoEquipaCaso(null);

                        router.reload({
                            only: ['casosPlaneados'],
                        });
                    }}
                />
            )}
        </AppLayout>
    );
}
