import { Head } from '@inertiajs/react';

type Props = {
    cirurgia: {
        id: number;
    };
};

export default function Edit({ cirurgia }: Props) {
    return (
        <>
            <Head title="Editar Cirurgia" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Editar Cirurgia #{cirurgia.id}
                </h1>
            </div>
        </>
    );
}