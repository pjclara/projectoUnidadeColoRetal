import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import CreateOrUpdateDoente from './CreateOrUpdateDoente';

type DoenteItem = {
    id: number;
    nome?: string | null;
    pu?: string | null;
    data_nascimento?: string | null;
    sexo?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    doentes: {
        data: DoenteItem[];
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Doentes',
        href: '/doentes',
    },
];

export default function Index({ doentes }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<DoenteItem | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">Doentes</h1>
                <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={() => setShowModal(true)}>
                    Criar Doente
                </button>
                <div className="mt-6">
                    {doentes.data.length === 0 ? (
                        <p>Nenhum registo encontrado.</p>
                    ) : (
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Nome</th>
                                    <th className="border px-4 py-2">PU</th>

                                    <th className="border px-4 py-2">Data de Nascimento</th>
                                    <th className="border px-4 py-2">Sexo</th>
                                    <th className="border px-4 py-2">Atualizado em</th>
                                    <th className="border px-4 py-2">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doentes.data.map((doente) => (
                                    <tr key={doente.id}>
                                        <td className="border px-4 py-2">{doente.id}</td>
                                        <td className="border px-4 py-2">{doente.nome ?? 'N/A'}</td>
                                        <td className="border px-4 py-2">{doente.pu ?? 'N/A'}</td>
                                        <td className="border px-4 py-2">{doente.data_nascimento ?? 'N/A'}</td>
                                        <td className="border px-4 py-2">{doente.sexo ?? 'N/A'}</td>
                                        <td className="border px-4 py-2">{doente.updated_at ? new Date(doente.updated_at).toLocaleString() : '-'}</td>

                                        <td className="border px-4 py-2">
                                            <button className="rounded bg-blue-600 px-3 py-1 text-white" onClick={() => setEditing(doente)}>
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {editing && <CreateOrUpdateDoente doente={editing} onClose={() => setEditing(null)} />}
        </AppLayout>
    );
}
