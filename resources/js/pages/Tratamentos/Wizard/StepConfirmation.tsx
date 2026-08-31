import { router } from '@inertiajs/react';

import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { Button } from '@/components/ui/button';

import type { Tratamento, Doente, Episodio } from '../../../types/types';

type Props = {
    doente: Doente;
    episodio: Episodio;
    tratamento?: Tratamento;
};

export function StepConfirmation({ doente, episodio, tratamento }: Props) {
    return (
        <div className="space-y-6">
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center dark:border-green-900 dark:bg-green-950">
                <p className="text-lg font-semibold text-green-700 dark:text-green-400">Tratamento criado com sucesso.</p>
            </div>

            <AppEntitySummary
                title="Doente"
                fields={[
                    { label: 'Nome', value: doente.nome },
                    { label: 'PU', value: doente.pu },
                ]}
            />

            <AppEntitySummary
                title="Episódio"
                fields={[
                    { label: 'Tipo', value: episodio.tipo },
                    { label: 'Diagnóstico', value: episodio.diagnostico },
                    { label: 'Estado', value: episodio.estado },
                ]}
            />

            <AppEntitySummary
                title="Tratamento"
                fields={[
                    { label: 'Tipo', value: tratamento?.tipo },
                    { label: 'Data proposta', value: tratamento?.data_proposta },
                    { label: 'Data de início', value: tratamento?.data_inicio },
                    { label: 'Intenção', value: tratamento?.intencao },
                ]}
            />

            <div className="flex justify-end gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-800">
                <Button type="button" variant="outline" onClick={() => router.get('/tratamentos')}>
                    Voltar aos Tratamentos
                </Button>

                {tratamento && (
                    <Button type="button" onClick={() => router.get(`/tratamentos/${tratamento.id}`)}>
                        Ver Tratamento
                    </Button>
                )}
            </div>
        </div>
    );
}
