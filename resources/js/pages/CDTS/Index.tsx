import { Head } from '@inertiajs/react';

type CDTItem = {
    id: number;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    cDTs: {
        data: CDTItem[];
    };
};

export default function Index({ cDTs }: Props) {
    return (
        <>
            <Head title="CDTS" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    CDTS
                </h1>

                <div className="mt-6">
                    {cDTs.data.length === 0 ? (
                        <p>Nenhum registo encontrado.</p>
                    ) : (
                        <ul>
                            {cDTs.data.map((item) => (
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