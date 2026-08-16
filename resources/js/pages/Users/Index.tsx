import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import CreateOrUpdateUserModal from './CreateOrUpdateUserModal';

type Props = {
    users: {
        data: {
            id: number;
            name: string;
            email: string;
            numero_mecanografico?: string | null;
            categoria?: string | null;
            especialidade?: string | null;
            ativo: boolean;
        }[];
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Utilizadores',
        href: '/users',
    },
];


export default function UsersIndex(users: Props) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
console.log('UsersIndex props:', selectedUser);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Utilizadores" />
            <div className="mb-6 flex items-center justify-between p-4">
                <h1 className="text-2xl font-semibold">Utilizadores</h1>
                <Button
                    onClick={() => {
                        setSelectedUser(null);
                        setOpenModal(true);
                    }}
                    className="rounded bg-green-600 px-4 py-2 text-white"
                >
                    Novo Utilizador
                </Button>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-800">
                            <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-700">ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-700">Nome</th>
                            <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-700">Email</th>
                            <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-700">Número Mecanográfico</th>
                            <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-700">Categoria</th>
                            <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-700">Especialidade</th>
                            <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-700">Ativo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.users.data.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="border border-gray-300 px-4 py-2 text-center dark:border-gray-700">
                                    <PlaceholderPattern className="h-8 w-full" />
                                </td>
                            </tr>
                        ) : (
                            users.users.data.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-700">{user.id}</td>
                                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-700">{user.name}</td>
                                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-700">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-700">{user.numero_mecanografico}</td>
                                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-700">{user.categoria}</td>
                                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-700">{user.especialidade}</td>
                                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-700">{user.ativo ? 'Sim' : 'Não'}</td>
                                    <td>
                                        <Button
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setOpenModal(true);
                                            }}
                                            className="rounded bg-blue-600 px-3 py-1 text-white"
                                        >
                                            Editar
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <CreateOrUpdateUserModal open={openModal} onClose={() => setOpenModal(false)} user={selectedUser} />
        </AppLayout>
    );
}
