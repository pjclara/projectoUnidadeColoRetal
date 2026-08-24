import { AppPageHeader } from '@/components/app/app-page-header';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';

type AvaliacaoErasItem = {
    id: number;
    episodio_id: number;
    data_avaliacao: string;
    aptidao: string;
    asa: string;
    polo_recomendado: string;
    mfr: string;
    dias_prehabilitacao: number;
    notas: string;
    fonte: string;
};

type Props = {
    avaliacoes: {
        data: AvaliacaoErasItem[];
    };
};

const breadcrumbs = [{ title: 'AvaliacaoEras', href: '/avaliacao-eras' }];

const columns: AppTableColumn<AvaliacaoErasItem>[] = [
    { label: '#', key: 'id' },
    { label: 'Episódio ID', key: 'episodio_id' },
    { label: 'Data Avaliação', key: 'data_avaliacao' },
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
            <Button
                variant="link"
                onClick={() => {
                    // Handle edit action here
                }}
            >
                Editar
            </Button>
        ),
    },
];

export default function Index({ avaliacoes }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="AvaliacaoEras" />{' '}
            <div className="p-6">
                <AppPageHeader
                    title="AvaliacaoEras"
                    description="Lista de Avaliações ERAS"
                    action={<Button onClick={() => router.get('/avaliacao-eras/create')}>Nova Avaliação ERAS</Button>}
                />
                <AppTable columns={columns} data={avaliacoes.data} />
            </div>
        </AppLayout>
    );
}
