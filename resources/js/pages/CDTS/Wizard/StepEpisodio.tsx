import { useState } from 'react';

import { AppEmptyState } from '@/components/app/app-empty-state';
import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import CreateOrUpdateEpisodio from '@/pages/Episodios/CreateOrUpdateEpisodio';

import type { Doente, Episodio, Pagination, Profissional } from './types';

type Props = {
    doente: Doente;
    episodios: Pagination<Episodio> | null;
    profissionais: Profissional[];
    selectedEpisodio: Episodio | null;
    onSelect: (episodio: Episodio) => void;
    onBack: () => void;
    onContinue: () => void;
};

export function StepEpisodio({ doente, episodios, profissionais, selectedEpisodio, onSelect, onBack, onContinue }: Props) {
    const [showCreate, setShowCreate] = useState(false);

    const episodiosList = episodios?.data ?? [];

    const columns: AppTableColumn<Episodio>[] = [
        { key: 'tipo', label: 'Tipo' },
        { key: 'diagnostico', label: 'Diagnóstico', render: (episodio) => episodio.diagnostico ?? '—' },
        { key: 'cid10', label: 'CID10', render: (episodio) => episodio.cid10 ?? '—' },
        { key: 'data_diagnostico', label: 'Data diagnóstico', render: (episodio) => episodio.data_diagnostico ?? '—' },
        { key: 'estado', label: 'Estado' },
        {
            key: 'acoes',
            label: 'Ações',
            className: 'text-right',
            render: (episodio) => (
                <div className="flex justify-end">
                    <Button
                        type="button"
                        size="sm"
                        variant={selectedEpisodio?.id === episodio.id ? 'default' : 'outline'}
                        onClick={() => onSelect(episodio)}
                    >
                        {selectedEpisodio?.id === episodio.id ? 'Selecionado' : 'Selecionar'}
                    </Button>
                </div>
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
                    <h2 className="text-xl font-semibold">Selecionar episódio</h2>
                    <p className="mt-1 text-sm text-neutral-500">Escolha um episódio existente ou registe um novo.</p>
                </div>

                <Button type="button" onClick={() => setShowCreate(true)}>
                    Novo episódio
                </Button>
            </div>

            {episodiosList.length === 0 ? (
                <AppEmptyState
                    title="Este doente ainda não possui episódios."
                    action={{ label: 'Criar novo episódio', onClick: () => setShowCreate(true) }}
                />
            ) : (
                <AppTable columns={columns} data={episodiosList} rowKey={(episodio) => episodio.id} />
            )}

            <div className="flex justify-between border-t border-neutral-200 pt-5 dark:border-neutral-800">
                <Button type="button" variant="outline" onClick={onBack}>
                    Voltar
                </Button>

                <Button type="button" disabled={!selectedEpisodio} onClick={onContinue}>
                    Continuar
                </Button>
            </div>

            {showCreate && (
                <CreateOrUpdateEpisodio
                    profissionais={profissionais}
                    doenteId={doente.id}
                    onClose={() => setShowCreate(false)}
                    onCreated={(episodio) => {
                        setShowCreate(false);
                        onSelect(episodio as Episodio);
                    }}
                />
            )}
        </div>
    );
}
