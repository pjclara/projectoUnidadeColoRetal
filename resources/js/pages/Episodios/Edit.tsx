import { Head } from '@inertiajs/react';

type Props = {
    episodio: {
        id: number;
    };
};

export default function Edit({ episodio }: Props) {
    return (
        <>
            <Head title="Editar Episodio" />

            <div className="p-6">
                <h1 className="text-2xl font-semibold">
                    Editar Episodio #{episodio.id}
                </h1>
            </div>
        </>
    );
}