import { Head } from '@inertiajs/react';

type Props = {
    casoEquipa: {
        id: number;
    };
};

export default function Show({ casoEquipa }: Props) {
    return (
        <>
            <Head title="CasoEquipa" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    CasoEquipa #{casoEquipa.id}
                </h1>
            </div>
        </>
    );
}