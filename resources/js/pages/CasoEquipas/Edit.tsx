import { Head } from '@inertiajs/react';

type Props = {
    casoEquipa: {
        id: number;
    };
};

export default function Edit({ casoEquipa }: Props) {
    return (
        <>
            <Head title="Editar CasoEquipa" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Editar CasoEquipa #{casoEquipa.id}
                </h1>
            </div>
        </>
    );
}