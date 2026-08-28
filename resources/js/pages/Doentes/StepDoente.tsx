import { AppModalForm } from '@/components/app/app-modal-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DoenteForm } from '@/pages/Doentes/DoenteForm';
import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Pagination, Doente } from '@/types/types';

type Props = {
    doentes: Pagination<Doente>;
    selectedDoente: Doente | null;
    onSelect: (doente: Doente) => void;
    onCreate: (doente: Doente) => void;
};

export function StepDoente({ doentes, selectedDoente, onSelect, onCreate }: Props) {
    const [search, setSearch] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        nome: '',
        pu: '',
        data_nascimento: '',
        sexo: '',
    });

    const filteredDoentes = useMemo(() => {
        const doentesList = Array.isArray(doentes) ? doentes : doentes.data;
        const value = search.trim().toLowerCase();

        if (!value) {
            return doentesList;
        }

        return doentesList.filter((doente) => doente.nome.toLowerCase().includes(value) || doente.pu.toLowerCase().includes(value));
    }, [doentes, search]);

    const submitCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        router.post('/doentes', form, {
            preserveScroll: true,

            onSuccess: (page) => {
                /*
                 * Idealmente o backend devolve o doente criado.
                 * Na primeira versão podemos atualizar a página
                 * e posteriormente otimizar este fluxo.
                 */
                setLoading(false);
                setShowCreate(false);
            },

            onFinish: () => {
                setLoading(false);
            },
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Selecionar doente</h2>

                <p className="mt-1 text-sm text-neutral-500">Procure um doente existente ou crie um novo.</p>
            </div>

            <div className="flex gap-3">
                <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Pesquisar por nome ou PU..."
                    className="flex-1"
                />

                <Button type="button" onClick={() => setShowCreate(true)}>
                    Novo doente
                </Button>
            </div>

            <div className="overflow-hidden rounded-xl border dark:border-neutral-800">
                {filteredDoentes.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-sm text-neutral-500">Nenhum doente encontrado.</p>

                        <Button className="mt-4" onClick={() => setShowCreate(true)}>
                            Criar novo doente
                        </Button>
                    </div>
                ) : (
                    <div className="divide-y dark:divide-neutral-800">
                        {filteredDoentes.map((doente) => (
                            <div key={doente.id} className="flex items-center justify-between p-4">
                                <div>
                                    <p className="font-medium">{doente.nome}</p>

                                    <p className="text-sm text-neutral-500">PU: {doente.pu}</p>

                                    {doente.data_nascimento && <p className="text-xs text-neutral-500">Nascimento: {doente.data_nascimento}</p>}
                                </div>

                                <Button onClick={() => onSelect(doente)}>Selecionar</Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AppModalForm
                open={showCreate}
                title="Novo doente"
                description="Introduza os dados de identificação."
                onClose={() => setShowCreate(false)}
                onSubmit={submitCreate}
                loading={loading}
                maxWidth="3xl"
                submitLabel="Criar doente"
            >
                <DoenteForm form={form} errors={{}} onChange={(field, value) => setForm((current) => ({ ...current, [field]: value }))} />
            </AppModalForm>
        </div>
    );
}
