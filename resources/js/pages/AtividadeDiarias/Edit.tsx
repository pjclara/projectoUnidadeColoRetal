import { Head } from '@inertiajs/react';

type Props = {
    atividadeDiaria: {
        id: number;
    };
};

export default function Edit({ atividadeDiaria }: Props) {
    return (
        <>
            <Head title="Editar AtividadeDiaria" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Editar AtividadeDiaria #{atividadeDiaria.id}
                </h1>
            </div>
        </>
    );
}