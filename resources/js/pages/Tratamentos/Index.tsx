import { AppPageHeader } from '@/components/app/app-page-header';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';

type TratamentoItem = {
    id: number;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    tratamentos: {
        data: TratamentoItem[];
    };
};

const breadcrumbs = [{ title: 'Tratamentos', href: '/tratamentos' }];

const columns: AppTableColumn<TratamentoItem>[] = [
    {
        key: 'id',
        label: 'ID',
    },
];

export default function Index({ tratamentos }: Props) {
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
            </div>
        </AppLayout>
    );
}
