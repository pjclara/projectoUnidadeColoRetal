import { Head } from '@inertiajs/react';

type Props = {
    cDT: {
        id: number;
    };
};

export default function Edit({ cDT }: Props) {
    return (
        <>
            <Head title="Editar CDT" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Editar CDT #{cDT.id}
                </h1>
            </div>
        </>
    );
}