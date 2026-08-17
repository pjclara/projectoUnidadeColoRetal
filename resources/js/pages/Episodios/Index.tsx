import { Head } from '@inertiajs/react';

type EpisodioItem = {
    id: number;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    episodios: {
        data: EpisodioItem[];
    };
};

export default function Index({ episodios }: Props) {
    return (
        <>
            <Head title="Episodios" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Episodios
                </h1>

                <div className="mt-6">
                    {episodios.data.length === 0 ? (
                        <p>Nenhum registo encontrado.</p>
                    ) : (
                        <ul>
                            {episodios.data.map((item) => (
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