import { Head } from '@inertiajs/react';

type Props = {
    casoPlaneado: {
        id: number;
    };
};

export default function Edit({ casoPlaneado }: Props) {
    return (
        <>
            <Head title="Editar CasoPlaneado" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Editar CasoPlaneado #{casoPlaneado.id}
                </h1>
            </div>
        </>
    );
}