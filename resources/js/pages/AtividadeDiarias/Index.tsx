import { AppPageHeader } from '@/components/app/app-page-header';
import { AppTable } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { User } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import CreateOrUpdateAtividadeDiaria from './CreateOrUpdateAtividadeDiaria';

type AtividadeDiariaItem = {
    id: number;
    user_id?: number | null;
    data?: string | null;
    polo?: string | null;
    periodo?: string | null;
    detalhe?: string | null;
    fonte?: string | null;
};

type Props = {
    atividadeDiarias: {
        data: AtividadeDiariaItem[];
    };
    poloOptions: Array<{ label: string; value: string }>;
    userOptions: User[];
    periodoOptions: Array<{ label: string; value: string }>;
    tipoOptions: Array<{ label: string; value: string }>;
};

export default function Index({ atividadeDiarias, poloOptions, userOptions, periodoOptions, tipoOptions }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<AtividadeDiariaItem | null>(null);

    const openCreate = () => {
        setEditingItem(null);
        console.log('Opening create modal');
        setIsOpen(true);
    };

    const openEdit = (item: AtividadeDiariaItem) => {
        console.log('Opening edit modal for item:', item);
        setEditingItem(item);
        setIsOpen(true);
    };

    const columns = [
        { label: 'Profissional', key: 'user' },
        { label: 'Data', key: 'data' },
        { label: 'Polo', key: 'polo' },
        { label: 'Periodo', key: 'periodo' },
        { label: 'Tipo', key: 'tipo' },
        { label: 'Detalhe', key: 'detalhe' },
        {
            label: 'Ações',
            key: 'actions',
            render: (item: AtividadeDiariaItem) => <Button onClick={() => openEdit(item)}>Editar</Button>,
        },
    ];

    const breadcrumbs = [{ title: 'AtividadeDiarias', href: '/atividade-diarias' }];

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="AtividadeDiarias" />

                <div className="p-6">
                    <AppPageHeader
                        title="Atividade Diária"
                        description="Lista de Atividades Diárias"
                        action={<Button onClick={openCreate}>Nova Atividade Diária</Button>}
                    />

                    <AppTable columns={columns} data={atividadeDiarias.data} />
                </div>
            </AppLayout>

            <CreateOrUpdateAtividadeDiaria
                open={isOpen}
                onClose={() => setIsOpen(false)}
                atividade={editingItem}
                poloOptions={poloOptions}
                userOptions={[
                    ...userOptions.map((user) => ({
                        value: String(user.id),
                        label: user.name,
                    })),
                ]}
                periodoOptions={periodoOptions}
                tipoOptions={tipoOptions}
            />
        </div>
    );
}
