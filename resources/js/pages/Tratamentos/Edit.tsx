import { Head } from '@inertiajs/react';

type Props = {
    tratamento: {
        id: number;
    };
};

export default function Edit({ tratamento }: Props) {
    return (
        <>
            <Head title="Editar Tratamento" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Editar Tratamento #{tratamento.id}
                </h1>
            </div>
        </>
    );
}