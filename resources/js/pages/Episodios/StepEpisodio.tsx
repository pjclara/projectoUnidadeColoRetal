import { Button } from '@/components/ui/button';
import type { Doente, Episodio, Pagination, User } from '@/types/types';
import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppTable, AppTableColumn } from '@/components/app/app-table';

type Props = {
    doente: Doente;
    users?: User[] | null;
    episodios?: Episodio[] | Pagination<Episodio> | null;
    onBack: () => void;
    onCreate: () => void;
    onEdit: (episodio: Episodio) => void;
};


const columns = (onEdit: (episodio: Episodio) => void): AppTableColumn<Doente>[] => [
    { label: 'Id', key: 'id' },
    { label: 'Motivo', key: 'motivo' },
    { label: 'Diagnostico', key: 'diagnostico' },
    
];

export function StepEpisodio({
    doente,
    users,
    episodios,
    onBack,
    onCreate,
    onEdit,
}: Props) {
    const episodiosList = Array.isArray(episodios)
        ? episodios
        : episodios?.data ?? [];

    return (
        <div className="space-y-6">
            {/* Doente */}
            <AppEntitySummary
                title="Doente selecionado"
                fields={[
                    { label: 'Nome', value: doente.nome },
                    { label: 'PU', value: doente.pu },
                ]}
                actions={{
                    editLabel: 'Alterar doente',
                }}                
            />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">
                        Episódios
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                        Histórico de episódios deste doente.
                    </p>
                </div>

                <Button onClick={onCreate}>
                    Novo episódio
                </Button>
            </div>

            {/* Lista */}
            {episodiosList.length === 0 ? (
                <div className="rounded-xl border border-dashed p-10 text-center">
                    <p className="text-sm text-neutral-500">
                        Este doente ainda não possui episódios.
                    </p>

                    <Button
                        className="mt-4"
                        onClick={onCreate}
                    >
                        Criar primeiro episódio
                    </Button>
                </div>
            ) : (
                <AppTable
                    columns={columns(onEdit)}
                    data={episodiosList}
                />
            )}
        </div>
    );
}