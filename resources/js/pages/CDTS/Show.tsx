import { Head } from '@inertiajs/react';

type Props = {
    cDT: {
        id: number;
    };
};

export default function Show({ cDT }: Props) {
    return (
        <>
            <Head title="CDT" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    CDT #{cDT.id}
                </h1>
            </div>
        </>
    );
}