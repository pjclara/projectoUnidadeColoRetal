import { Head } from '@inertiajs/react';

type Props = {
    slot: {
        id: number;
    };
};

export default function Edit({ slot }: Props) {
    return (
        <>
            <Head title="Editar Slot" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Editar Slot #{slot.id}
                </h1>
            </div>
        </>
    );
}