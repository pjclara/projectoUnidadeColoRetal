import { Head } from '@inertiajs/react';

type CirurgiaItem = {
    id: number;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    cirurgias: {
        data: CirurgiaItem[];
    };
};

export default function Index({ cirurgias }: Props) {
    return (
        <>
            <Head title="Cirurgias" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Cirurgias
                </h1>

                <div className="mt-6">
                    {cirurgias.data.length === 0 ? (
                        <p>Nenhum registo encontrado.</p>
                    ) : (
                        <ul>
                            {cirurgias.data.map((item) => (
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