import { AppEmptyState } from '@/components/app/app-empty-state';
import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type { Doente, Episodio, Pagination, Sala } from '../../types/types';
import { CreateOrEditSalaModal } from './CreateOrUpdateSala';
import { AppSelectField } from '@/components/app/app-input-select';

type StepSalaProps = {
    doente: Doente;
    episodio: Episodio;
    salas: Pagination<Sala> | Sala[];
    poloOptions: { value: string; label: string }[];
    selectedSala: Sala | null;
    onSelect: (sala: Sala) => void;

    onBack: () => void;
    onContinue: () => void;
};

export default function StepSala({ doente, episodio, salas, poloOptions, selectedSala, onSelect, onBack, onContinue }: StepSalaProps) {
    const salasList = Array.isArray(salas) ? salas : salas.data;
    const [editingSala, setEditingSala] = useState<Sala | null>(null);
    const [showCreate, setShowCreate] = useState(false);
    const [selectedPolo, setSelectedPolo] = useState('');

    const filteredSalas = selectedPolo ? salasList.filter((sala) => sala.polo.trim().toUpperCase() === selectedPolo.trim().toUpperCase()) : salasList;

    const columns: AppTableColumn<Sala>[] = [
        {
            key: 'nome_sala',
            label: 'Nome da Sala',
        },
        {
            key: 'acoes',
            label: 'Ações',
            className: 'text-right',
            render: (sala) => {
                const selecionada = selectedSala?.id === sala.id;

                return (
                    <Button type="button" size="sm" variant={selecionada ? 'default' : 'outline'} onClick={() => onSelect(sala)}>
                        {selecionada ? 'Selecionada' : 'Selecionar'}
                    </Button>
                );
            },
        },
    ];

    return (
        <div className="space-y-6">
            {/* Doente */}
            <AppEntitySummary
                title="Doente selecionado"
                fields={[
                    {
                        label: 'Nome',
                        value: doente.nome,
                    },
                    {
                        label: 'PU',
                        value: doente.pu,
                    },
                    {
                        label: 'Data de nascimento',
                        value: doente.data_nascimento,
                    },
                    {
                        label: 'Sexo',
                        value: doente.sexo,
                    },
                ]}
                action={
                    <Button type="button" variant="outline" onClick={onBack}>
                        Alterar doente
                    </Button>
                }
            />

            {/* Episódio */}
            <AppEntitySummary
                title="Episódio selecionado"
                fields={[
                    {
                        label: 'Tipo',
                        value: episodio.tipo,
                    },
                    {
                        label: 'Diagnóstico',
                        value: episodio.diagnostico,
                    },
                    {
                        label: 'CID-10',
                        value: episodio.cid10,
                    },
                    {
                        label: 'Data do diagnóstico',
                        value: episodio.data_diagnostico,
                    },
                    {
                        label: 'Estado',
                        value: episodio.estado,
                    },
                ]}
                action={
                    <Button type="button" variant="outline" onClick={onBack}>
                        Alterar episódio
                    </Button>
                }
            />
            {/* Sala selecionada */}
            {selectedSala && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                    <p className="text-sm text-green-800 dark:text-green-200">
                        <strong>Sala selecionada:</strong> {selectedSala.nome_sala}
                    </p>
                </div>
            )}
            {/* Salas */}
            <div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Selecionar sala</h2>

                    <p className="mt-1 text-sm text-neutral-500">Selecione a sala onde será realizado o procedimento.</p>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between">
                        <div>
                            <AppSelectField
                                label="Filtrar por polo"
                                options={poloOptions}
                                value={selectedPolo}
                                onChange={(value) => setSelectedPolo(String(value))}
                            />
                        </div>
                        <div className="mt-2 self-end">
                            <Button type="button" onClick={() => setShowCreate(true)}>
                                Criar nova sala
                            </Button>
                        </div>
                    </div>
                </div>

                {filteredSalas.length === 0 ? (
                    <AppEmptyState
                        title={selectedPolo ? 'Nenhuma sala encontrada para este polo' : 'Nenhuma sala encontrada'}
                        description={
                            selectedPolo ? 'Não existem salas disponíveis para o polo selecionado.' : 'Não existem salas disponíveis para seleção.'
                        }
                        action={{ label: 'Criar nova Sala', onClick: () => setShowCreate(true) }}
                    />
                ) : (
                    <AppTable columns={columns} data={filteredSalas} rowKey={(sala) => sala.id} />
                )}
            </div>

            {/* Navegação */}
            <div className="flex justify-between border-t border-neutral-200 pt-5 dark:border-neutral-800">
                <Button type="button" variant="outline" onClick={onBack}>
                    Voltar
                </Button>

                <Button type="button" disabled={!selectedSala} onClick={onContinue}>
                    Continuar
                </Button>
            </div>

            {showCreate && (
                <CreateOrEditSalaModal
                    sala={editingSala ?? null}
                    poloOptions={poloOptions}
                    onClose={() => {
                        setShowCreate(false);
                    }}
                />
            )}
        </div>
    );
}
