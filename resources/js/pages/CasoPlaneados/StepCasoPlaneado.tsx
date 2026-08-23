import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import CreateOrUpdateEpisodio from '../Episodios/CreateOrUpdateEpisodio';
import type { CasoPlaneado, Doente, Episodio, Pagination, User } from './../../types/types';
import CreateOrUpdateCasoPlaneado from './CreateOrUpdateCasoPlaneado';

type Props = {
    doente: Doente;
    episodio: Episodio | null;
    slots: { id: number; nome_slot: string }[];
    users: User[];
    casoPlaneado?: CasoPlaneado | null;
    casosPlaneados?: Pagination<CasoPlaneado> | null;
    onBack: () => void;
    onSuccess: () => void;
};

export function StepCasoPlaneado({ doente, episodio, users, onBack, casosPlaneados, onSuccess, casoPlaneado, slots }: Props) {
    const [showCreate, setShowCreate] = useState(false);
    const casosPlaneadosList = casosPlaneados?.data ?? [];


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
                    <Button type="button" variant="outline" onClick={onBack}>
                        Alterar doente
                    </Button>
                }
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Selecionar Caso Planeado</h2>
                    <p className="mt-1 text-sm text-neutral-500">Escolha um Caso Planeado existente ou registe um novo.</p>
                </div>


                <Button type="button" onClick={() => setShowCreate(true)}>
                    Novo Caso Planeado
                </Button>
            </div>
            {showCreate && (
                <CreateOrUpdateCasoPlaneado
                    users={users}
                    episodio={episodio ?? null}
                    slots={slots}
                    casoPlaneado={casoPlaneado ?? null}
                    onClose={() => setShowCreate(false)}
                    onCreated={(casoPlaneado) => {
                        setShowCreate(false);
                        onSuccess();}}
                />
            )}
        </div>
    );
}
