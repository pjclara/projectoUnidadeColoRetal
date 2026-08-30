import { Head } from '@inertiajs/react';

type Props = {
    atividadeDiaria: {
        id: number;
    };
};

export default function Show({ atividadeDiaria }: Props) {
    return (
        <>
            <Head title="AtividadeDiaria" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    AtividadeDiaria #{atividadeDiaria.id}
                </h1>
            </div>
        </>
    );
}