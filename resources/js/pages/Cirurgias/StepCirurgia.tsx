import { useState } from 'react';
import type { User } from '../../types/types';
import { AppEmptyState } from '@/components/app/app-empty-state';
import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppTable, type AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import type { CasoPlaneado, Cirurgia, Doente, Episodio } from '../../types/types';
import CreateOrUpdateCasoPlaneado from '../CasoPlaneados/CreateOrUpdateCasoPlaneado';
import CreateOrUpdateCirurgia from './CreateOrUpdateCirurgia';

type Props = {
    doente: Doente;
    episodio: Episodio;
    casosPlaneados: CasoPlaneado[];
    slots: any[];
    users: User[];
    onBack: () => void;
    onSuccess: (cirurgia: Cirurgia) => void;
};

export default function StepCirurgia({ doente, episodio, casosPlaneados, slots, users, onBack, onSuccess }: Props) {
    const [casoPlaneado, setCasoPlaneado] = useState<CasoPlaneado | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showCreateNovoCasoPlaneado, setShowCreateNovoCasoPlaneado] = useState(false);
    const casosDoEpisodio = casosPlaneados.filter((caso) => caso.episodio_id === episodio.id);

    const columns: AppTableColumn<CasoPlaneado>[] = [
        { label: 'Ordem', key: 'ordem' },
        { label: 'Procedimento previsto', key: 'procedimento_previsto' },
        {
            label: 'Ações',
            key: 'actions',
            className: 'text-right',
            render: (caso) => (
                <Button type="button" size="sm" variant={casoPlaneado?.id === caso.id ? 'default' : 'outline'} onClick={() => setCasoPlaneado(caso)}>
                    {casoPlaneado?.id === caso.id ? 'Selecionado' : 'Selecionar'}
                </Button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <AppEntitySummary
                title="Doente selecionado"
                fields={[
                    { label: 'Nome', value: doente.nome },
                    { label: 'PU', value: doente.pu },
                ]}
            />
            <AppEntitySummary
                title="Episódio selecionado"
                fields={[
                    { label: 'Tipo', value: episodio.tipo },
                    { label: 'Diagnóstico', value: episodio.diagnostico },
                    { label: 'Estado', value: episodio.estado },
                ]}
                action={
                    <Button type="button" variant="outline" onClick={onBack}>
                        Alterar episódio
                    </Button>
                }
            />

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Caso planeado</h2>
                    <p className="mt-1 text-sm text-neutral-500">Selecione o caso planeado associado à cirurgia.</p>
                </div>
                <Button type="button" variant="outline" onClick={() => setShowCreateNovoCasoPlaneado(true)}>
                    Criar novo caso planeado
                </Button>
                <Button type="button" disabled={!casoPlaneado} onClick={() => setShowForm(true)}>
                    Registar cirurgia
                </Button>
            </div>

            {casosDoEpisodio.length === 0 ? (
                <AppEmptyState
                    title="Não existem casos planeados para este episódio."

                    action={{ label: 'Criar novo caso planeado', onClick: () => setShowCreateNovoCasoPlaneado(true) }}
                />
            ) : (
                <AppTable columns={columns} data={casosDoEpisodio} rowKey={(caso) => caso.id} />
            )}

            <div className="flex justify-start border-t border-neutral-200 pt-5 dark:border-neutral-800">
                <Button type="button" variant="outline" onClick={onBack}>
                    Voltar
                </Button>
            </div>

            {showForm && casoPlaneado && (
                <CreateOrUpdateCirurgia casoPlaneado={casoPlaneado} onClose={() => setShowForm(false)} onSuccess={onSuccess} />
            )}

            {showCreateNovoCasoPlaneado && (
                <CreateOrUpdateCasoPlaneado
                    users={users}
                    episodio={episodio ?? null}
                    slots={slots}
                    casoPlaneado={casoPlaneado ?? null}
                    onClose={() => setShowCreateNovoCasoPlaneado(false)}
                    onCreated={(casoPlaneado) => {
                        setShowCreateNovoCasoPlaneado(false);
                    }}
                />
            )}
        </div>
    );
}
