import { router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { AppEntitySummary } from '@/components/app/app-entity-summary';

import { AppEmptyState } from '@/components/app/app-empty-state';
import type { CDT, Doente, Episodio } from './types';
import { Button } from '@/components/ui/button';
import { AppTable, AppTableColumn } from '@/components/app/app-table';

type Props = {
    doente: Doente;
    episodio: Episodio;
    onBack: () => void;
    onSuccess: (cdt: CDT) => void;
    onContinue: (cdt: CDT) => void;
};

type FormData = {
    episodio_id: number;
    data_pedido: string;
    data_discussao: string;
    decisao: string;
    estadio_clinico: string;
};

export function StepCDT({ doente, episodio, onBack, onSuccess, onContinue }: Props) {
    const [form, setForm] = useState<FormData>({
        episodio_id: episodio.id,
        data_pedido: '',
        data_discussao: '',
        decisao: '',
        estadio_clinico: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const [showCreate, setShowCreate] = useState(false);

    const cdtsList = episodio.cdts ?? [];

    const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: '' }));
    };

    const columns: AppTableColumn<CDT>[] = [
        {
            label: 'Data Pedido',
            key: 'data_pedido',
        },
        {
            label: 'Data Discussao',
            key: 'data_discussao',
        },
        {
            label: 'Decisao',
            key: 'decisao',
        },
        {
            label: 'Estadio Clinico',
            key: 'estadio_clinico',
        },
        {
            label: 'Ações',
            key: 'actions',
            render: (cdt: CDT) => (
                <Button type="button" onClick={() => onContinue(cdt)}>
                    Continuar
                </Button>
            ),
        }
    ];
        
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrors({});

        router.post('/cdts', form, {
            preserveScroll: true,

            onSuccess: (page) => {
                toast.success('CDT criada com sucesso.');

                const createdCdt = (page.props as { flash?: { created_cdt?: CDT } }).flash?.created_cdt;

                if (createdCdt) {
                    onSuccess(createdCdt);
                }
            },

            onError: (validationErrors: Record<string, string>) => {
                setErrors(validationErrors);
                toast.error('Verifique os dados introduzidos.');
            },

            onFinish: () => setLoading(false),
        });
    };

    return (
        <div className="space-y-6">
            <AppEntitySummary
                title="Doente selecionado"
                fields={[
                    { label: 'Nome', value: doente.nome },
                    { label: 'PU', value: doente.pu },
                    { label: 'Nascimento', value: doente.data_nascimento },
                    { label: 'Sexo', value: doente.sexo },
                ]}
                action={
                    <Button type="button" onClick={onBack}>
                        Alterar doente
                    </Button>
                }
            />
            <AppEntitySummary
                title="Episódio selecionado"
                fields={[
                    { label: 'Tipo', value: episodio.tipo },
                    { label: 'Diagnóstico', value: episodio.diagnostico },
                    { label: 'CID10', value: episodio.cid10 },
                    { label: 'Data diagnóstico', value: episodio.data_diagnostico },
                    { label: 'Estado', value: episodio.estado },
                ]}
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Selecionar CDT</h2>
                    <p className="mt-1 text-sm text-neutral-500">Escolha um CDT existente ou registe um novo.</p>
                </div>

                <Button type="button" onClick={() => setShowCreate(true)}>
                    Novo CDT
                </Button>
            </div>
            {cdtsList.length === 0 ? (
                <AppEmptyState title="Este doente ainda não possui CDTs." action={{ label: 'Criar novo CDT', onClick: () => setShowCreate(true) }} />
            ) : (
               <AppTable columns={columns} data={cdtsList} rowKey={(cdt) => cdt.id} />
            )}
            <div className="flex justify-between border-t border-neutral-200 pt-5 dark:border-neutral-800">
                <Button type="button" variant="outline" onClick={onBack}>
                    Voltar
                </Button>

            </div>

            {showCreate && <span>teste</span>}
        </div>
    );
}
