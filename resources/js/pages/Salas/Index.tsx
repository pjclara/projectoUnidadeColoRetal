import { AppPageHeader } from '@/components/app/app-page-header';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { CreateOrEditSalaModal } from './CreateOrUpdateSala';
import { useState } from 'react';

type SalaItem = {
    id: number;
    polo: string;
    codigo: string;
    designacao: string;
    ativa: boolean;
};

type Props = {
    salas: {
        data: SalaItem[];
    };
    poloOptions: { value: string; label: string }[];
};

const breadcrumbs = [{ title: 'Salas', href: '/salas' }];

export default function Index({ salas, poloOptions }: Props) {
    const [showSalaModal, setShowSalaModal] = useState(false);
    const [editingSala, setEditingSala] = useState<SalaItem | null>(null);

    const columns: AppTableColumn<SalaItem>[] = [
        { label: 'Polo', key: 'polo' },
        { label: 'Código', key: 'codigo' },
        { label: 'Designação', key: 'designacao' },
        {
            label: 'Ativa',
            key: 'ativa',
            render: (sala) => (sala.ativa ? 'Sim' : 'Não'),
        },
        {
            label: 'Ações',
            key: 'actions',
            render: (sala) => (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            setEditingSala(sala);
                            setShowSalaModal(true);
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
            <Head title="Salas" />

            <div className="p-6">
                <AppPageHeader
                    title="Salas"
                    description="Gestão e consulta de salas"
                    action={
                        <Button
                            onClick={() => {
                                setEditingSala(null); // criar
                                setShowSalaModal(true);
                            }}
                        >
                            Nova Sala
                        </Button>
                    }
                />

                <AppTable
                    columns={columns}
                    data={salas.data}
                    rowKey={(sala) => sala.id}
                />
            </div>

            {showSalaModal && (
                <CreateOrEditSalaModal
                    sala={editingSala}
                    poloOptions={poloOptions}
                    onClose={() => {
                        setEditingSala(null);
                        setShowSalaModal(false);
                    }}
                />
            )}
        </AppLayout>
    );
}