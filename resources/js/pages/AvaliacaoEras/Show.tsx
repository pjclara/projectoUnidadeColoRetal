import { Head } from '@inertiajs/react';

type Props = {
    avaliacaoEras: {
        id: number;
    };
};

export default function Show({ avaliacaoEras }: Props) {
    return (
        <>
            <Head title="AvaliacaoEras" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    AvaliacaoEras #{avaliacaoEras.id}
                </h1>
            </div>
        </>
    );
}