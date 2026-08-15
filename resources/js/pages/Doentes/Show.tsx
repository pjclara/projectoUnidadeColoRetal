import { Head } from '@inertiajs/react';

type Props = {
    doente: {
        id: number;
    };
};

export default function Show({ doente }: Props) {
    return (
        <>
            <Head title="Doente" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Doente #{doente.id}
                </h1>
            </div>
        </>
    );
}