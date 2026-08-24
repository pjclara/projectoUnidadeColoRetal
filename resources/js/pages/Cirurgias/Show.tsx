import { Head } from '@inertiajs/react';

type Props = {
    cirurgia: {
        id: number;
    };
};

export default function Show({ cirurgia }: Props) {
    return (
        <>
            <Head title="Cirurgia" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Cirurgia #{cirurgia.id}
                </h1>
            </div>
        </>
    );
}