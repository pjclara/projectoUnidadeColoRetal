import { AppPageHeader } from '@/components/app/app-page-header';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import CreateOrEditSlotModal from './CreateOrEditSlotModal';
import { Sala } from '@/types/types';

type SlotItem = {
    id: number;
    semana_id: number;
    data: string;
    sala_id: number;
    hora_inicio: string;
    hora_fim_prevista: string;
    estado: string;
    origem: string;
    observacoes: string;
    polo?: string;
    periodo?: string;
    modalidade?: string;
};

type Props = {
    slots: {
        data: SlotItem[];
    }
    salas: Sala[];
    estadoOptions: { value: string; label: string }[];
    origemOptions: { value: string; label: string }[];
    periodoOptions: { value: string; label: string }[];
    modalidadeOptions: { value: string; label: string }[];
};

const breadcrumbs = [{ title: 'Slots', href: '/Slots' }];

export default function Index({ slots, salas, estadoOptions, origemOptions, periodoOptions, modalidadeOptions }: Props) {
    const [showSlotModal, setShowSlotModal] = useState(false);
    const [editingSlot, setEditingSlot] = useState<SlotItem | null>(null);

    const columns: AppTableColumn<SlotItem>[] = [
        {
            label: 'Semana',
            key: 'semana_id',
        },
        {
            label: 'Data',
            key: 'data',
        },
        {
            label: 'Sala',
            key: 'sala_id',
        },
        {
            label: 'Hora Início',
            key: 'hora_inicio',
        },
        {
            label: 'Hora Fim Prevista',
            key: 'hora_fim_prevista',
        },
        {
            label: 'Estado',
            key: 'estado',
        },
        {
            label: 'Origem',
            key: 'origem',
        },
        {
            label: 'Observações',
            key: 'observacoes',
        },
        {
            label: 'Ações',
            key: 'actions',
            render: (Slot) => (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            setEditingSlot(Slot);
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
            <Head title="Slots" />

            <div className="p-6">
                <AppPageHeader
                    title="Slots"
                    description="Gestão e consulta de Slots"
                    action={
                        <Button
                            onClick={() => {
                                setEditingSlot(null); // criar
                                setShowSlotModal(true);
                            }}
                        >
                            Nova Slot
                        </Button>
                    }
                />

                <AppTable columns={columns} data={slots.data} rowKey={(Slot) => Slot.id} />
            </div>

            {showSlotModal && (
                <CreateOrEditSlotModal
                    slot={editingSlot ?? null}
                    onClose={() => {
                        setEditingSlot(null);
                        setShowSlotModal(false);
                    }}
                    estados={estadoOptions}
                    salas={salas}
                    origems={origemOptions}
                    periodos={periodoOptions}
                    modalidades={modalidadeOptions}
                />
            )}
        </AppLayout>
    );
}
