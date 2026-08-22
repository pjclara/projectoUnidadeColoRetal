import { Head } from '@inertiajs/react';

type Props = {
    slot: {
        id: number;
    };
};

export default function Show({ slot }: Props) {
    return (
        <>
            <Head title="Slot" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Slot #{slot.id}
                </h1>
            </div>
        </>
    );
}