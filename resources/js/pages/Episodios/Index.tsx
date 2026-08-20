import { AppPageHeader } from '@/components/app/app-page-header';
import { AppPagination } from '@/components/app/app-pagination';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import CreateOrUpdateEpisodio from './CreateOrUpdateEpisodio';

type Episodio = {
    id: string;
    doente_nome?: string | null;
    doente?: {
        nome?: string | null;
        pu?: string | null;
    } | null;
    tipo?: string | null;
    diagnostico?: string | null;
    data_diagnostico?: string | null;
    sexo?: string | null;
    created_at?: string | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Sexo = {
    id: number;
    nome: string;
};

type TipoEpisodio = {
    id: string;
    nome: string;
};

type Props = {
    episodios: {
        data: Episodio[];
        links: PaginationLink[];
        from?: number | null;
        to?: number | null;
        total?: number | null;
    };

    sexos: Sexo[];
    tipos: TipoEpisodio[];
    users: { id: number; name: string }[];

    filters?: {
        search?: string;
        sexo?: string;
        tipo?: string;
    };
};

type Filters = {
    search: string;
    sexo: string;
    tipo: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Episódios',
        href: '/episodios',
    },
];

export default function Index({ episodios, filters: initialFilters, sexos, tipos, users }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Episodio | null>(null);
    const [deleting, setDeleting] = useState<Episodio | null>(null);

    const [filters, setFilters] = useState<Filters>({
        search: initialFilters?.search ?? '',
        sexo: initialFilters?.sexo ?? '',
        tipo: initialFilters?.tipo ?? '',
    });

    const columns: AppTableColumn<Episodio>[] = [
        {
            key: 'doente',
            label: 'Doente',
            render: (episodio) => (
                <div>
                    <div className="font-medium">{episodio.doente?.nome ?? '—'}</div>

                    <div className="text-muted-foreground text-xs">PU: {episodio.doente?.pu ?? '—'}</div>
                </div>
            ),
        },
        {
            key: 'tipo',
            label: 'Tipo',
        },
        {
            key: 'diagnostico',
            label: 'Diagnóstico',
        },
        {
            key: 'data_diagnostico',
            label: 'Diagnóstico em',
        },
        {
            key: 'acoes',
            label: 'Ações',
            className: 'text-right',
            render: (episodio) => (
                <div className="flex justify-end gap-2">
                    <Button size="sm" onClick={() => setEditing(episodio)}>
                        Editar
                    </Button>

                    <Button className="bg-green-500" size="sm" onClick={() => router.get(`/episodios/${episodio.id}`)}>
                        Ver
                    </Button>

                    <Button size="sm" variant="destructive" onClick={() => setDeleting(episodio)}>
                        Eliminar
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Episódios" />

            <div className="p-6">
                <AppPageHeader
                    title="Episódios"
                    description="Gestão e consulta de episódios clínicos"
                    action={
                        <Button type="button" size="sm" variant="outline" onClick={() => router.get('/episodios/create')}>
                            Novo episódio
                        </Button>
                    }
                />
                <AppTable columns={columns} data={episodios.data} rowKey={(episodio) => episodio.id} />
                <AppPagination
                    links={episodios.links}
                    from={episodios.from ?? undefined}
                    to={episodios.to ?? undefined}
                    total={episodios.total ?? undefined}
                />
            </div>

            {(editing || showModal) && (
                <CreateOrUpdateEpisodio
                    profissionais={users}
                    episodio={editing}
                    onClose={() => {
                        setEditing(null);
                        setShowModal(false);
                    }}
                />
            )}
        </AppLayout>
    );
}
