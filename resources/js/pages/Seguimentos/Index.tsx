import { Head } from '@inertiajs/react';

type SeguimentoItem = {
    id: number;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    seguimentos: {
        data: SeguimentoItem[];
    };
};

export default function Index({ seguimentos }: Props) {
    return (
        <>
            <Head title="Seguimentos" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Seguimentos
                </h1>

                <div className="mt-6">
                    {seguimentos.data.length === 0 ? (
                        <p>Nenhum registo encontrado.</p>
                    ) : (
                        <ul>
                            {seguimentos.data.map((item) => (
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