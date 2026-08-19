import { AppFilters } from '@/components/app/app-filters';
import { AppFormField } from '@/components/app/app-form-field';
import { AppPageHeader } from '@/components/app/app-page-header';
import { AppPagination } from '@/components/app/app-pagination';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import CreateOrUpdateEpisodio from './CreateOrUpdateEpisodio';

type Episodio = {
    id: string;
    doente_nome?: string | null;
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

export default function Index({ episodios, filters: initialFilters, sexos, tipos }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Episodio | null>(null);
    const [deleting, setDeleting] = useState<Episodio | null>(null);

    const [filters, setFilters] = useState<Filters>({
        search: initialFilters?.search ?? '',
        sexo: initialFilters?.sexo ?? '',
        tipo: initialFilters?.tipo ?? '',
    });

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get('/episodios', filters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleReset = () => {
        const emptyFilters: Filters = {
            search: '',
            sexo: '',
            tipo: '',
        };

        setFilters(emptyFilters);

        router.get('/episodios', {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const columns: AppTableColumn<Episodio>[] = [
        {
            key: 'doente_nome',
            label: 'Doente',
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
            key: 'sexo',
            label: 'Sexo',
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

                    <Button
                        className="bg-green-500"
                        size="sm"
                        onClick={() => router.get(`/episodios/${episodio.id}`)}
                    >
                        Ver
                    </Button>

                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleting(episodio)}
                    >
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
                        <Button
                            onClick={() => {
                                setEditing(null);
                                setShowModal(true);
                            }}
                        >
                            Novo episódio
                        </Button>
                    }
                />



                <AppTable
                    columns={columns}
                    data={episodios.data}
                    rowKey={(episodio) => episodio.id}
                />

                <AppPagination
                    links={episodios.links}
                    from={episodios.from}
                    to={episodios.to}
                    total={episodios.total}
                />
            </div>

            {(editing || showModal) && (
                <CreateOrUpdateEpisodio
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
