import { Head } from '@inertiajs/react';

type DoenteItem = {
    id: number;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    doentes: {
        data: DoenteItem[];
    };
};

export default function Index({ doentes }: Props) {
    return (
        <>
            <Head title="Doentes" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Doentes
                </h1>

                <div className="mt-6">
                    {doentes.data.length === 0 ? (
                        <p>Nenhum registo encontrado.</p>
                    ) : (
                        <ul>
                            {doentes.data.map((item) => (
                                <li key={item.id}>
                                    #{item.id}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}