import { AppModalForm } from '@/components/app/app-modal-form';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppInputField } from '@/components/app/app-input-field';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export type User = {
    id: number | string;
    name: string;
};

export type CasoEquipa = {
    id?: number;
    caso_planeado_id?: number;
    user_id: number | string;
    funcao: string;
    user?: User | null;
};

type Props = {
    open: boolean;
    casoPlaneadoId: number;
    users: User[];
    casoEquipas?: CasoEquipa[];
    onClose: () => void;
    onSuccess?: () => void;
};

type EquipaForm = {
    caso_planeado_id: number;
    user_id: string;
    funcao: string;
};

const emptyEquipa = (casoPlaneadoId: number): EquipaForm => ({
    caso_planeado_id: casoPlaneadoId,
    user_id: '',
    funcao: '',
});

export default function CreateOrUpdateCasoEquipa({
    open,
    casoPlaneadoId,
    users,
    casoEquipas = [],
    onClose,
    onSuccess,
}: Props) {
    const [equipas, setEquipas] = useState<EquipaForm[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) {
            return;
        }

        setEquipas(
            casoEquipas.map((equipa) => ({
                caso_planeado_id: casoPlaneadoId,
                user_id: String(equipa.user_id),
                funcao: equipa.funcao ?? '',
            })),
        );
    }, [open, casoEquipas]);

    const adicionarEquipa = () => {
        setEquipas((current) => [
            ...current,
            {
                ...emptyEquipa(casoPlaneadoId),
            },
        ]);
    };

    const removerEquipa = (index: number) => {
        setEquipas((current) =>
            current.filter((_, equipaIndex) => equipaIndex !== index),
        );
    };

    const updateEquipa = <K extends keyof EquipaForm>(
        index: number,
        field: K,
        value: EquipaForm[K],
    ) => {
        setEquipas((current) =>
            current.map((equipa, equipaIndex) =>
                equipaIndex === index
                    ? {
                          ...equipa,
                          [field]: value,
                      }
                    : equipa,
            ),
        );
    };

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        router.post(
            `/caso-planeados/${casoPlaneadoId}/equipas`,
            {
                equipas: equipas.map((equipa) => ({
                    caso_planeado_id: casoPlaneadoId,
                    user_id: equipa.user_id,
                    funcao: equipa.funcao,
                })),
            },
            {
                preserveScroll: true,

                onSuccess: () => {
                    toast.success('Equipa do caso atualizada com sucesso.');

                    onSuccess?.();
                    onClose();
                },

                onError: () => {
                    toast.error(
                        'Não foi possível guardar a equipa do caso.',
                    );
                },

                onFinish: () => {
                    setLoading(false);
                },
            },
        );
    };

    return (
        <AppModalForm
            open={open}
            title="Gerir equipa do caso"
            description="Adicione os profissionais e respetivas funções para este caso planeado."
            onClose={onClose}
            onSubmit={submit}
            loading={loading}
            maxWidth="4xl"
            submitLabel="Guardar equipa"
        >
            <div className="space-y-4">
                {equipas.length === 0 && (
                    <div className="rounded-lg border border-dashed p-6 text-center">
                        <p className="text-sm text-neutral-500">
                            Ainda não existem profissionais associados a este
                            caso.
                        </p>
                    </div>
                )}

                {equipas.map((equipa, index) => (
                    <div
                        key={equipa.caso_planeado_id ?? `new-${index}`}
                        className="rounded-xl border bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">
                                    Profissional {index + 1}
                                </h3>

                                <p className="text-sm text-neutral-500">
                                    Profissional e função no caso
                                </p>
                            </div>

                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                disabled={loading}
                                onClick={() => removerEquipa(index)}
                            >
                                Remover
                            </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <AppSelectField
                                label="Profissional"
                                value={equipa.user_id}
                                onChange={(value) =>
                                    updateEquipa(
                                        index,
                                        'user_id',
                                        String(value),
                                    )
                                }
                                required
                                options={[
                                    ...users.map((user) => ({
                                        value: String(user.id),
                                        label: user.name,
                                    })),
                                ]}
                            />

                            <AppInputField
                                label="Função"
                                value={equipa.funcao}
                                onChange={(value) =>
                                    updateEquipa(
                                        index,
                                        'funcao',
                                        String(value),
                                    )
                                }
                                placeholder="Ex.: Cirurgião, Anestesista..."
                                required
                            />
                        </div>
                    </div>
                ))}

                <div className="flex justify-start">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={adicionarEquipa}
                        disabled={loading}
                    >
                        + Adicionar profissional
                    </Button>
                </div>
            </div>
        </AppModalForm>
    );
}