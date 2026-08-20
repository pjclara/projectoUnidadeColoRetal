import { Head, router } from '@inertiajs/react';

import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppPageHeader } from '@/components/app/app-page-header';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

type Props = {
    cdt: {
        id: number;
        data_pedido: string | null;
        data_discussao: string | null;
        decisao: string | null;
        estadio_clinico: string | null;
        episodio: {
            id: number;
            tipo: string;
            diagnostico: string | null;
            cid10: string | null;
            data_diagnostico: string | null;
            estado: string;
        };
        doente: {
            id: number;
            nome: string;
            pu: string;
            data_nascimento: string | null;
            sexo: string | null;
        } | null;
    };
};

export default function Show({ cdt }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'CDTs', href: '/cdts' },
        { title: `CDT #${cdt.id}`, href: `/cdts/${cdt.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`CDT #${cdt.id}`} />

            <div className="space-y-6 p-6">
                <AppPageHeader
                    title={`CDT #${cdt.id}`}
                    description="Detalhe da discussão de caso"
                    action={
                        <Button variant="outline" onClick={() => router.get('/cdts')}>
                            Voltar às CDT
                        </Button>
                    }
                />

                {cdt.doente && (
                    <AppEntitySummary
                        title="Doente"
                        fields={[
                            { label: 'Nome', value: cdt.doente.nome },
                            { label: 'PU', value: cdt.doente.pu },
                            { label: 'Nascimento', value: cdt.doente.data_nascimento },
                            { label: 'Sexo', value: cdt.doente.sexo },
                        ]}
                    />
                )}

                <AppEntitySummary
                    title="Episódio"
                    fields={[
                        { label: 'Tipo', value: cdt.episodio.tipo },
                        { label: 'Diagnóstico', value: cdt.episodio.diagnostico },
                        { label: 'CID10', value: cdt.episodio.cid10 },
                        { label: 'Data diagnóstico', value: cdt.episodio.data_diagnostico },
                        { label: 'Estado', value: cdt.episodio.estado },
                    ]}
                />

                <AppEntitySummary
                    title="CDT"
                    fields={[
                        { label: 'Data do pedido', value: cdt.data_pedido },
                        { label: 'Data da discussão', value: cdt.data_discussao },
                        { label: 'Estádio clínico', value: cdt.estadio_clinico },
                        { label: 'Decisão', value: cdt.decisao },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
