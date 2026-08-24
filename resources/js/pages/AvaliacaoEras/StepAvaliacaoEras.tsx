import { useState } from 'react';

import { AppEmptyState } from '@/components/app/app-empty-state';
import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import type { AvaliacaoEras, Doente, Episodio, Pagination } from '../../types/types';
import { CreateOrUpdateAvaliacaoEras } from './CreateOrUpdateAvaliacaoEras';

type Props = {
    doente: Doente;
    episodio: Episodio;
    avaliacaoEras: Pagination<AvaliacaoEras> | null;
    onBack: () => void;
    onContinue: () => void;
    url: string;
    onSuccess: (avaliacaoEras: AvaliacaoEras) => void;
    poloOptions: { value: string; label: string }[];
};

export default function StepAvaliacaoEras({ doente, episodio, avaliacaoEras, onBack, onSuccess, onContinue, url, poloOptions }: Props) {
    const [showCreate, setShowCreate] = useState(false);

    const avaliacaoErasList = avaliacaoEras?.data ?? [];

    console.log('avaliacaoErasList', avaliacaoErasList);
    const columns: AppTableColumn<AvaliacaoEras>[] = [
        { key: 'data_consulta', label: 'Data' },
        { key: 'aptidao', label: 'Aptidão' },
        { key: 'asa', label: 'ASA' },
        { key: 'polo_recomendado', label: 'Polo recomendado' },
        { key: 'mfr', label: 'MFR' },
        { key: 'dias_prehabilitacao', label: 'Dias de pré-habilitação' },
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

            {avaliacaoErasList.length === 0 ? (
                <AppEmptyState
                    title="Este doente ainda não possui avaliações ERAS."
                    action={{ label: 'Criar nova avaliação ERAS', onClick: () => setShowCreate(true) }}
                />
            ) : (
                <AppTable columns={columns} data={avaliacaoErasList} rowKey={(avaliacao) => avaliacao.id} />
            )}

            <div className="flex justify-between border-t border-neutral-200 pt-5 dark:border-neutral-800">
                <Button type="button" variant="outline" onClick={onBack}>
                    Voltar
                </Button>

                <Button type="button" disabled={!episodio} onClick={onContinue}>
                    Continuar
                </Button>
            </div>

            {showCreate && (
                <CreateOrUpdateAvaliacaoEras
                    doente={doente}
                    episodio={episodio}
                    onBack={() => setShowCreate(false)}
                    poloOptions={poloOptions}
                    onSuccess={(createdAvaliacaoEras) => {
                        setShowCreate(false);
                        onSuccess(createdAvaliacaoEras);
                    }}
                />
            )}
        </div>
    );
}
