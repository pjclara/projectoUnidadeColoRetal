import { Head } from '@inertiajs/react';

type CasoPlaneadoItem = {
    id: number;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    casoPlaneados: {
        data: CasoPlaneadoItem[];
    };
};

export default function Index({ casoPlaneados }: Props) {
    return (
        <>
            <Head title="CasoPlaneados" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    CasoPlaneados
                </h1>

                <div className="mt-6">
                    {casoPlaneados.data.length === 0 ? (
                        <p>Nenhum registo encontrado.</p>
                    ) : (
                        <ul>
                            {casoPlaneados.data.map((item) => (
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