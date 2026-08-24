import { AppPageHeader } from '@/components/app/app-page-header';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { CreateOrUpdateAvaliacaoEras } from './CreateOrUpdateAvaliacaoEras';
import type { AvaliacaoEras, Doente, Episodio } from '../../types/types';

type AvaliacaoErasItem = {
    id: number;
    episodio_id: number;
    data_consulta: string;
    aptidao: string;
    asa: string;
    polo_recomendado: string;
    mfr: string;
    dias_prehabilitacao: number;
    notas: string;
    fonte: string;
    episodio: Episodio | null;
    doente: Doente | null;
};

type Props = {
    avaliacoes: {
        data: AvaliacaoErasItem[];
    };
    poloOptions: { value: string; label: string }[];
};

const breadcrumbs = [{ title: 'AvaliacaoEras', href: '/avaliacao-eras' }];

export default function Index({ avaliacoes, poloOptions }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<AvaliacaoErasItem | null>(null);
    const [form, setForm] = useState({
        id: 0,
        episodio_id: 0,
        data_consulta: '',
        aptidao: '',
        asa: '',
        polo_recomendado: '',
        mfr: '',
        dias_prehabilitacao: 0,
        notas: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);

    const openEditModal = (item: AvaliacaoErasItem) => {
        setEditing(item);
        setForm({
            id: item.id,
            episodio_id: item.episodio_id,
            data_consulta: item.data_consulta,
            aptidao: item.aptidao,
            asa: item.asa,
            polo_recomendado: item.polo_recomendado,
            mfr: item.mfr,
            dias_prehabilitacao: item.dias_prehabilitacao,
            notas: item.notas,
        });
        setModalOpen(true);
    };

    const columns: AppTableColumn<AvaliacaoErasItem>[] = [
        { label: '#', key: 'id' },
        { label: 'Episódio ID', key: 'episodio_id' },
        { label: 'Data consulta', key: 'data_consulta' },
        { label: 'Aptidão', key: 'aptidao' },
        { label: 'ASA', key: 'asa' },
        { label: 'Polo Recomendado', key: 'polo_recomendado' },
        { label: 'MFR', key: 'mfr' },
        { label: 'Dias Pré-Habilitação', key: 'dias_prehabilitacao' },
        { label: 'Notas', key: 'notas' },
        {
            key: 'acoes',
            label: 'Ações',
            className: 'text-right',
            render: (item) => (
                <div className="flex justify-end gap-2">
                    <Button size="sm" onClick={() => openEditModal(item)}>
                        Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => router.delete(`/avaliacao-eras/${item.id}`)}>
                        Eliminar
                    </Button>
                </div>
            ),
        },
    ];

    console.log('avaliacoes', editing);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="AvaliacaoEras" />{' '}
            <div className="p-6">
                <AppPageHeader
                    title="Avaliacão Eras"
                    description="Lista de Avaliações ERAS"
                    action={<Button onClick={() => router.get('/avaliacao-eras/create')}>Nova Avaliação ERAS</Button>}
                />
                <AppTable columns={columns} data={avaliacoes.data} />
            </div>
            {modalOpen && (
                <CreateOrUpdateAvaliacaoEras
                    doente={editing?.doente ?? null}
                    episodio={editing?.episodio ?? null}
                    avaliacaoEras={editing}
                    onBack={() => setModalOpen(false)}
                    poloOptions={poloOptions}
                    onSuccess={(createdAvaliacaoEras) => {
                        setModalOpen(false);
                    }}
                />
            )}
        </AppLayout>
    );
}
