import { Head } from '@inertiajs/react';

type Props = {
    episodio: {
        id: number;
    };
};

export default function Show({ episodio }: Props) {
    return (
        <>
            <Head title="Episodio" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Episodio #{episodio.id}
                </h1>
            </div>
        </>
    );
}