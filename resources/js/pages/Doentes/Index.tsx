import { AppConfirmDialog } from '@/components/app/app-confirm-dialog';
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
import CreateOrUpdateDoente from './CreateOrUpdateDoente';
import toast from 'react-hot-toast';
import type { Doente, PaginationLink, Sexo, Filters } from '@/types/types';

type Props = {
    doentes: {
        data: Doente[];
        links: PaginationLink[];
        from?: number | null;
        to?: number | null;
        total?: number | null;
    };

    sexos: Sexo[];

    filters?: {
        search?: string;
        sexo?: string;
    };
};


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Doentes',
        href: '/doentes',
    },
];

export default function Index({ doentes, filters: initialFilters, sexos }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Doente | null>(null);
    const [deleting, setDeleting] = useState<Doente | null>(null);
    const [deletingLoading, setDeletingLoading] = useState(false);

    const [filters, setFilters] = useState<Filters>({
        search: initialFilters?.search ?? '',
        sexo: initialFilters?.sexo ?? '',
    });

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get('/doentes', filters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleReset = () => {
        const emptyFilters: Filters = {
            search: '',
            sexo: '',
        };

        setFilters(emptyFilters);

        router.get(
            '/doentes',
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const columns: AppTableColumn<Doente>[] = [
        {
            key: 'nome',
            label: 'Nome',
        },
        {
            key: 'pu',
            label: 'PU',
        },
        {
            key: 'data_nascimento',
            label: 'Nascimento',
        },
        {
            key: 'sexo',
            label: 'Sexo',
        },
        {
            key: 'acoes',
            label: 'Ações',
            className: 'text-right',
            render: (doente) => (
                <div className="flex justify-end gap-2">
                    <Button size="sm" onClick={() => setEditing(doente)}>
                        Editar
                    </Button>
                    <Button className="bg-green-500" size="sm" onClick={() => router.get(`/doentes/${doente.id}`)}>
                        Ver
                    </Button>

                    <Button size="sm" variant="destructive" onClick={() => setDeleting(doente)}>
                        Eliminar
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Doentes" />

            <div className="p-6">
                <AppPageHeader
                    title="Doentes"
                    description="Gestão e consulta de doentes"
                    action={
                        <Button
                            onClick={() => {
                                setEditing(null);
                                setShowModal(true);
                            }}
                        >
                            Novo doente
                        </Button>
                    }
                />

                <AppFilters onSubmit={handleSearch} onReset={handleReset}>
                    <AppFormField label="Pesquisa">
                        <Input
                            value={filters.search}
                            onChange={(event) =>
                                setFilters((current) => ({
                                    ...current,
                                    search: event.target.value,
                                }))
                            }
                            placeholder="Pesquisar..."
                        />
                    </AppFormField>

                    <AppFormField label="Sexo" htmlFor="sexo">
                        <select
                            id="sexo"
                            value={filters.sexo}
                            onChange={(e) =>
                                setFilters((current) => ({
                                    ...current,
                                    sexo: e.target.value,
                                }))
                            }
                            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                        >
                            <option value="">Todos</option>

                            {sexos.map((sexo) => (
                                <option key={sexo.id} value={String(sexo.id)}>
                                    {sexo.nome}
                                </option>
                            ))}
                        </select>
                    </AppFormField>
                </AppFilters>

                <AppTable columns={columns} data={doentes.data} rowKey={(doente) => doente.id} />

                <AppPagination
                    links={doentes.links}
                    from={doentes.from ?? undefined}
                    to={doentes.to ?? undefined}
                    total={doentes.total ?? undefined}
                />
            </div>

            {(editing || showModal) && (
                <CreateOrUpdateDoente
                    doente={editing as unknown as React.ComponentProps<typeof CreateOrUpdateDoente>['doente']}
                    onClose={() => {
                        setEditing(null);
                        setShowModal(false);
                    }}
                />
            )}

            <AppConfirmDialog
                open={deleting !== null}
                title="Eliminar doente"
                description="Esta operação não pode ser anulada."
                onClose={() => setDeleting(null)}
                onConfirm={() => {
                    if (!deleting) {
                        return;
                    }

                    setDeletingLoading(true);

                    router.delete(`/doentes/${deleting.id}`, {
                        preserveScroll: true,

                        onSuccess: () => {
                            toast.success('Doente eliminado com sucesso!');
                            setDeleting(null);
                        },

                        onError: () => {
                            toast.error('Não foi possível eliminar o doente.');
                        },

                        onFinish: () => {
                            setDeletingLoading(false);
                        },
                    });
                }}
                loading={deletingLoading}
                confirmLabel="Eliminar"
                loadingLabel="A eliminar..."
            >
                Tem a certeza de que pretende eliminar o doente <strong>{deleting?.nome}</strong>?
            </AppConfirmDialog>
        </AppLayout>
    );
}
