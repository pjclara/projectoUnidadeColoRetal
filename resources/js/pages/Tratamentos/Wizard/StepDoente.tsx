import { router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

import { AppEmptyState } from '@/components/app/app-empty-state';
import { AppFilters } from '@/components/app/app-filters';
import { AppFormField } from '@/components/app/app-form-field';
import { AppPagination } from '@/components/app/app-pagination';
import { AppTable, AppTableColumn } from '@/components/app/app-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CreateOrUpdateDoente from '@/pages/Doentes/CreateOrUpdateDoente';

import type { CDTFilters, Doente, Pagination } from './types';

type Props = {
    doentes: Pagination<Doente>;
    filters: CDTFilters;
    selectedDoente: Doente | null;
    onSelect: (doente: Doente) => void;
    onBack: () => void;
    onContinue: () => void;
    url: string;
};

export function StepDoente({ doentes, filters: initialFilters, selectedDoente, onSelect, onContinue, url }: Props) {
    const [filters, setFilters] = useState(initialFilters);
    const [showCreate, setShowCreate] = useState(false);
    const [searching, setSearching] = useState(false);

    const search = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearching(true);

        router.get(url, filters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => setSearching(false),
        });
    };

    const reset = () => {
        const emptyFilters: CDTFilters = { search: '', pu: '', nome: '', data_nascimento: '' };
        setFilters(emptyFilters);

        router.get(url, {}, { preserveState: true, preserveScroll: true, replace: true });
    };

    const columns: AppTableColumn<Doente>[] = [
        { key: 'nome', label: 'Nome' },
        { key: 'pu', label: 'PU' },
        { key: 'data_nascimento', label: 'Data nascimento' },
        { key: 'sexo', label: 'Sexo' },
        {
            key: 'acoes',
            label: 'Ações',
            className: 'text-right',
            render: (doente) => (
                <div className="flex justify-end">
                    <Button type="button" size="sm" variant={selectedDoente?.id === doente.id ? 'default' : 'outline'} onClick={() => onSelect(doente)}>
                        {selectedDoente?.id === doente.id ? 'Selecionado' : 'Selecionar'}
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Selecionar doente</h2>
                <p className="mt-1 text-sm text-neutral-500">Pesquise pelo PU, nome ou data de nascimento.</p>
            </div>

            <AppFilters onSubmit={search} onReset={reset} loading={searching}>
                <AppFormField label="PU">
                    <Input value={filters.pu} onChange={(event) => setFilters((current) => ({ ...current, pu: event.target.value }))} placeholder="Número PU" />
                </AppFormField>
            </AppFilters>

            {selectedDoente && (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
                    Doente selecionado: <strong>{selectedDoente.nome}</strong> (PU: {selectedDoente.pu})
                </div>
            )}

            {doentes.data.length === 0 ? (
                <AppEmptyState
                    title="Nenhum doente encontrado."
                    description="Ajuste os filtros de pesquisa ou crie um novo doente."
                    action={{ label: 'Criar novo doente', onClick: () => setShowCreate(true) }}
                />
            ) : (
                <AppTable columns={columns} data={doentes.data} rowKey={(doente) => doente.id} />
            )}

            <AppPagination links={doentes.links} from={doentes.from} to={doentes.to} total={doentes.total ?? undefined} />

            <div className="flex justify-end border-t border-neutral-200 pt-5 dark:border-neutral-800">
                <Button type="button" disabled={!selectedDoente} onClick={onContinue}>
                    Continuar
                </Button>
            </div>

            {showCreate && (
                <CreateOrUpdateDoente
                    onClose={() => setShowCreate(false)}
                    endpoint="/cdts/doentes"
                    onCreated={(doente) => {
                        setShowCreate(false);
                        onSelect(doente);
                        onContinue();
                    }}
                />
            )}
        </div>
    );
}
