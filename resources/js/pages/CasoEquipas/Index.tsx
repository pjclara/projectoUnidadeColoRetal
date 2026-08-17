import { Head } from '@inertiajs/react';

type CasoEquipaItem = {
    id: number;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    casoEquipas: {
        data: CasoEquipaItem[];
    };
};

export default function Index({ casoEquipas }: Props) {
    return (
        <>
            <Head title="CasoEquipas" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    CasoEquipas
                </h1>

                <div className="mt-6">
                    {casoEquipas.data.length === 0 ? (
                        <p>Nenhum registo encontrado.</p>
                    ) : (
                        <ul>
                            {casoEquipas.data.map((item) => (
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