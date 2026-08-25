import { AppEmptyState } from '@/components/app/app-empty-state';
import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';

import type {
    Doente,
    Episodio,
    Pagination,
    Sala,
    Slot,
} from '../../types/types';

type StepSlotProps = {
    doente: Doente;
    episodio: Episodio;
    sala: Sala;
    slots: Pagination<Slot> | Slot[];
    selectedSlot: Slot | null;
    onSelect: (slot: Slot) => void;

    onBack: () => void;
    onContinue: () => void;
};

export default function StepSlot({
    doente,
    episodio,
    sala,
    slots,
    selectedSlot,
    onSelect,
    onBack,
    onContinue,
}: StepSlotProps) {
    const slotsList = Array.isArray(slots) ? slots : slots.data;
    const slotsFilterBySala = slotsList.filter((slot) => slot.sala_id === sala.id);

    const columns: AppTableColumn<Slot>[] = [
        {
            key: 'nome_slot',
            label: 'Slot',
        },
        {
            key: 'acoes',
            label: 'Ações',
            className: 'text-right',
            render: (slot) => {
                const selecionado = selectedSlot?.id === slot.id;

                return (
                    <Button
                        type="button"
                        size="sm"
                        variant={selecionado ? 'default' : 'outline'}
                        onClick={() => onSelect(slot)}
                    >
                        {selecionado ? 'Selecionado' : 'Selecionar'}
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
            />

            {/* Sala */}
            <AppEntitySummary
                title="Sala selecionada"
                fields={[
                    {
                        label: 'Sala',
                        value: sala.nome_sala,
                    },
                ]}
                action={
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                    >
                        Alterar sala
                    </Button>
                }
            />

            {/* Slots */}
            <div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">
                        Selecionar slot
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                        Selecione o slot pretendido para a cirurgia.
                    </p>
                </div>

                {slotsFilterBySala.length === 0 ? (
                    <AppEmptyState
                        title="Nenhum slot encontrado"
                        description="Não existem slots disponíveis para a sala selecionada."
                    />
                ) : (
                    <AppTable
                        columns={columns}
                        data={slotsFilterBySala}
                        rowKey={(slot) => slot.id}
                    />
                )}
            </div>

            {/* Slot selecionado */}
            {selectedSlot && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                    <p className="text-sm text-green-800 dark:text-green-200">
                        <strong>Slot selecionado:</strong>{' '}
                        {selectedSlot.nome_slot}
                    </p>
                </div>
            )}

            {/* Navegação */}
            <div className="flex justify-between border-t border-neutral-200 pt-5 dark:border-neutral-800">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                >
                    Voltar
                </Button>

                <Button
                    type="button"
                    disabled={!selectedSlot}
                    onClick={onContinue}
                >
                    Continuar
                </Button>
            </div>
        </div>
    );
}