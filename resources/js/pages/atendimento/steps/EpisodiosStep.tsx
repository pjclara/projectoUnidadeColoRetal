import { Button } from '@/components/ui/button';
import type { Doente, Episodio } from '../types';

type Props = {
    doente: Doente;
    episodios: Episodio[];
    onBack: () => void;
    onCreate: () => void;
    onEdit: (episodio: Episodio) => void;
};

export function EpisodiosStep({
    doente,
    episodios,
    onBack,
    onCreate,
    onEdit,
}: Props) {
    return (
        <div className="space-y-6">
            {/* Doente */}
            <div className="rounded-xl border bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-950">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-neutral-500">
                            Doente selecionado
                        </p>

                        <h2 className="text-lg font-semibold">
                            {doente.nome}
                        </h2>

                        <p className="text-sm text-neutral-500">
                            PU: {doente.pu}
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        onClick={onBack}
                    >
                        Alterar doente
                    </Button>
                </div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">
                        Episódios
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                        Histórico de episódios deste doente.
                    </p>
                </div>

                <Button onClick={onCreate}>
                    Novo episódio
                </Button>
            </div>

            {/* Lista */}
            {episodios.length === 0 ? (
                <div className="rounded-xl border border-dashed p-10 text-center">
                    <p className="text-sm text-neutral-500">
                        Este doente ainda não possui episódios.
                    </p>

                    <Button
                        className="mt-4"
                        onClick={onCreate}
                    >
                        Criar primeiro episódio
                    </Button>
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border dark:border-neutral-800">
                    <div className="divide-y dark:divide-neutral-800">
                        {episodios.map((episodio) => (
                            <div
                                key={episodio.id}
                                className="flex items-center justify-between p-5"
                            >
                                <div>
                                    <p className="font-medium">
                                        {episodio.tipo}
                                    </p>

                                    <p className="text-sm text-neutral-500">
                                        {episodio.servico ?? '—'}
                                    </p>

                                    <p className="text-xs text-neutral-500">
                                        {episodio.iniciado_em}
                                    </p>
                                </div>

                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        onEdit(episodio)
                                    }
                                >
                                    Editar
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}