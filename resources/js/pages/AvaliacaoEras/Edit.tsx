import { Head } from '@inertiajs/react';

type Props = {
    avaliacaoEras: {
        id: number;
    };
};

export default function Edit({ avaliacaoEras }: Props) {
    return (
        <>
            <Head title="Editar AvaliacaoEras" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Editar AvaliacaoEras #{avaliacaoEras.id}
                </h1>
            </div>
        </>
    );
}