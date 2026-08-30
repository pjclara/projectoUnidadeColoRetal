import { Head } from '@inertiajs/react';

type Props = {
    seguimento: {
        id: number;
    };
};

export default function Edit({ seguimento }: Props) {
    return (
        <>
            <Head title="Editar Seguimento" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Editar Seguimento #{seguimento.id}
                </h1>
            </div>
        </>
    );
}