import { Head } from '@inertiajs/react';

type Props = {
    casoPlaneado: {
        id: number;
    };
};

export default function Show({ casoPlaneado }: Props) {
    return (
        <>
            <Head title="CasoPlaneado" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    CasoPlaneado #{casoPlaneado.id}
                </h1>
            </div>
        </>
    );
}