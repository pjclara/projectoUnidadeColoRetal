import { Head } from '@inertiajs/react';

type Props = {
    tratamento: {
        id: number;
    };
};

export default function Show({ tratamento }: Props) {
    return (
        <>
            <Head title="Tratamento" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Tratamento #{tratamento.id}
                </h1>
            </div>
        </>
    );
}