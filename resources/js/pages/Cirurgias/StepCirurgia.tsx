import { useState } from 'react';

import { AppEmptyState } from '@/components/app/app-empty-state';
import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import type { Cirurgia, Doente, Episodio, Pagination } from '../../types/types';
import CreateOrUpdateCirurgia from './CreateOrUpdateCirurgia';

type StepCirurgiaProps = {
    doente: Doente;
    episodio: Episodio;
    cirurgias: Pagination<Cirurgia> | null;
    onBack: () => void;
    onContinue: () => void;
    url: string;
    onSuccess: (cirurgias: Cirurgia) => void;
    poloOptions: { value: string; label: string }[];
};

export default function StepCirurgia({ doente, episodio, cirurgias, onBack, onContinue, url, onSuccess, poloOptions }: StepCirurgiaProps) {
    const [showCreate, setShowCreate] = useState(false);

    const [cirurgia, setCirurgia] = useState<Cirurgia | null>(null);

    const cirurgiasList = cirurgias?.data ?? [];

    const columns: AppTableColumn<Cirurgia>[] = [
        { key: 'procedimento', label: 'Procedimento' },
        { key: 'abordagem', label: 'Abordagem' },
    ];

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

            <AppEntitySummary
                title="Episódio selecionado"
                fields={[
                    { label: 'Data Início', value: episodio.diagnostico },
                    { label: 'Data Fim', value: episodio.pai_entrada },
                    { label: 'Descrição', value: episodio.data_diagnostico },
                    { label: 'Estado', value: episodio.estado },
                ]}
                action={
                    <Button type="button" variant="outline" onClick={onBack}>
                        Alterar episódio
                    </Button>
                }
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Selecionar avaliação ERAS</h2>
                    <p className="mt-1 text-sm text-neutral-500">Escolha uma avaliação existente ou registe uma nova.</p>
                </div>

                <Button type="button" onClick={() => setShowCreate(true)}>
                    Nova avaliação ERAS
                </Button>
            </div>

            {cirurgiasList.length === 0 ? (
                <AppEmptyState
                    title="Este doente ainda não possui avaliações ERAS."
                    action={{ label: 'Criar nova avaliação ERAS', onClick: () => setShowCreate(true) }}
                />
            ) : (
                <AppTable columns={columns} data={cirurgiasList} rowKey={(cirurgia) => cirurgia.id} />
            )}

            <div className="flex justify-between border-t border-neutral-200 pt-5 dark:border-neutral-800">
                <Button type="button" variant="outline" onClick={onBack}>
                    Voltar
                </Button>

                <Button type="button" disabled={!cirurgia} onClick={onContinue}>
                    Continuar
                </Button>
            </div>
            {showCreate && (
                <CreateOrUpdateCirurgia
                    casoPlaneado={casoPlaneado}
                    avaliacaoEras={null}
                    cirurgia={null}
                    onClose={() => setShowCreate(false)}
                    onSuccess={(cirurgia) => {
                        setShowCreate(false);
                        // atualizar lista
                    }}
                />
            )}
        </div>
    );
}
