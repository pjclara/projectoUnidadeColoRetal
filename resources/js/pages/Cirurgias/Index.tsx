import { AppTableColumn } from '@/components/app/app-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {AppTable} from '@/components/app/app-table';
import { AppPageHeader } from '@/components/app/app-page-header';
import { Button } from '@/components/ui/button';

type CirurgiaItem = {
    id: number;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    cirurgias: {
        data: CirurgiaItem[];
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cirurgias',
        href: '/cirurgias',
    },
];

const columns: AppTableColumn<CirurgiaItem>[] = [
    {
        label: '#',
        key: 'id',
    },
    {
        label: 'Ações',
        key: 'actions',
    },
];
        
export default function Index({ cirurgias }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cirurgias" />

            <div className="p-6">
                <AppPageHeader
                    title="Cirurgias"
                    description="Gestão e consulta de cirurgias"
                    action={<Button onClick={() => router.get('/cirurgias/create')}>Nova Cirurgia</Button>}
                />

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    {cirurgias.data.length === 0 ? (
                        <p className="p-6 text-sm text-muted-foreground">Nenhum registo encontrado.</p>
                    ) : (
                        <AppTable columns={columns} data={cirurgias.data} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}