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

type CDTItem = {
    id: number;
    episodio_id: number;
    data_pedido?: string | null;
    data_discussao?: string | null;
    decisao?: string | null;
    estadio_clinico?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    cdts: {
        data: CDTItem[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        from?: number | null;
        to?: number | null;
        total?: number | null;
    };
};
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'CDTs',
        href: '/cdts',
    },
];


export default function Index({ cdts }: Props) {
        const [editing, setEditing] = useState<CDTItem | null>(null);
        const [deleting, setDeleting] = useState<CDTItem | null>(null);
        const [deletingLoading, setDeletingLoading] = useState(false);
    
        const columns: AppTableColumn<CDTItem>[] = [
            {
                key: 'episodio_id',
                label: 'Episódio ID',
            },
            {
                key: 'data_pedido',
                label: 'Data Pedido',
            },
            {
                key: 'data_discussao',
                label: 'Data Discussão',
            },
            {
                key: 'decisao',
                label: 'Decisão',
            },
            {
                key: 'estadio_clinico',
                label: 'Estádio Clínico',
            },
            {
                key: 'acoes',
                label: 'Ações',
                className: 'text-right',
                render: (cdt) => (
                    <div className="flex justify-end gap-2">
                        <Button size="sm" onClick={() => setEditing(cdt)}>
                            Editar
                        </Button>

                        <Button
                            className="bg-green-500"
                            size="sm"
                            onClick={() => router.get(`/cdts/${cdt.id}`)}
                        >
                            Ver
                        </Button>

                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeleting(cdt)}
                        >
                            Eliminar
                        </Button>
                    </div>
                ),
            },
        ];
    return (
              <AppLayout breadcrumbs={breadcrumbs}>
                  <Head title="CDTs" />
                  <div className="p-6">
                      <AppPageHeader
                          title="CDTs"
                          description="Gestão e consulta de CDTs"
                          action={
                              <Button
                                  onClick={() => router.get('/cdts/create')}
                              >
                                  Novo CDT
                              </Button>
                          }
                      />
      
                      <AppTable columns={columns} data={cdts.data} rowKey={(cdt) => cdt.id} />

                      <AppPagination links={cdts.links} from={cdts.from ?? undefined} to={cdts.to ?? undefined} total={cdts.total ?? undefined} />
                  </div>
      
              </AppLayout>
    )

}