import { Head } from '@inertiajs/react';

type Props = {
    seguimento: {
        id: number;
    };
};

export default function Show({ seguimento }: Props) {
    return (
        <>
            <Head title="Seguimento" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Seguimento #{seguimento.id}
                </h1>
            </div>
        </>
    );
}