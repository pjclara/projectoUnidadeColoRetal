import { Head } from '@inertiajs/react';

type Props = {
    sala: {
        id: number;
    };
};

export default function Show({ sala }: Props) {
    return (
        <>
            <Head title="Sala" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Sala #{sala.id}
                </h1>
            </div>
        </>
    );
}