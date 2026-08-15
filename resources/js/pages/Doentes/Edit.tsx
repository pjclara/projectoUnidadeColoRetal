import { Head } from '@inertiajs/react';

type Props = {
    doente: {
        id: number;
    };
};

export default function Edit({ doente }: Props) {
    return (
        <>
            <Head title="Editar Doente" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Editar Doente #{doente.id}
                </h1>
            </div>
        </>
    );
}