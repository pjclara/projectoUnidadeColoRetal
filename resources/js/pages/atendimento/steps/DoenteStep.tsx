import { useMemo, useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppModalForm } from '@/components/app/app-modal-form';
import { AppFormField } from '@/components/app/app-form-field';
import type { Doente } from '../types';

type Props = {
    doentes: Doente[];
    selectedDoente: Doente | null;
    onSelect: (doente: Doente) => void;
    onCreate: (doente: Doente) => void;
};

export function DoenteStep({
    doentes,
    onSelect,
    onCreate,
}: Props) {
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
        const value = search.trim().toLowerCase();

        if (!value) {
            return doentes;
        }

        return doentes.filter((doente) =>
            doente.nome.toLowerCase().includes(value) ||
            doente.pu.toLowerCase().includes(value),
        );
    }, [doentes, search]);

    const submitCreate = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
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
                <h2 className="text-xl font-semibold">
                    Selecionar doente
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                    Procure um doente existente ou crie um novo.
                </p>
            </div>

            <div className="flex gap-3">
                <Input
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    placeholder="Pesquisar por nome ou PU..."
                    className="flex-1"
                />

                <Button
                    type="button"
                    onClick={() => setShowCreate(true)}
                >
                    Novo doente
                </Button>
            </div>

            <div className="overflow-hidden rounded-xl border dark:border-neutral-800">
                {filteredDoentes.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-sm text-neutral-500">
                            Nenhum doente encontrado.
                        </p>

                        <Button
                            className="mt-4"
                            onClick={() => setShowCreate(true)}
                        >
                            Criar novo doente
                        </Button>
                    </div>
                ) : (
                    <div className="divide-y dark:divide-neutral-800">
                        {filteredDoentes.map((doente) => (
                            <div
                                key={doente.id}
                                className="flex items-center justify-between p-4"
                            >
                                <div>
                                    <p className="font-medium">
                                        {doente.nome}
                                    </p>

                                    <p className="text-sm text-neutral-500">
                                        PU: {doente.pu}
                                    </p>

                                    {doente.data_nascimento && (
                                        <p className="text-xs text-neutral-500">
                                            Nascimento:{' '}
                                            {doente.data_nascimento}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    onClick={() =>
                                        onSelect(doente)
                                    }
                                >
                                    Selecionar
                                </Button>
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
                <div className="grid gap-6 md:grid-cols-2">
                    <AppFormField label="Nome">
                        <Input
                            value={form.nome}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    nome: event.target.value,
                                })
                            }
                        />
                    </AppFormField>

                    <AppFormField label="PU">
                        <Input
                            value={form.pu}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    pu: event.target.value,
                                })
                            }
                        />
                    </AppFormField>

                    <AppFormField label="Data de nascimento">
                        <Input
                            type="date"
                            value={form.data_nascimento}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    data_nascimento:
                                        event.target.value,
                                })
                            }
                        />
                    </AppFormField>

                    <AppFormField label="Sexo">
                        <select
                            value={form.sexo}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    sexo: event.target.value,
                                })
                            }
                            className="w-full rounded-lg border px-3 py-2"
                        >
                            <option value="">
                                Selecionar
                            </option>

                            <option value="M">
                                Masculino
                            </option>

                            <option value="F">
                                Feminino
                            </option>

                            <option value="O">
                                Outro
                            </option>
                        </select>
                    </AppFormField>
                </div>
            </AppModalForm>
        </div>
    );
}