import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppModal } from '@/components/app/app-modal';
import { AppTextareaField } from '@/components/app/app-textarea-field';
import { Button } from '@/components/ui/button';
import type { Sala, Slot } from '@/types/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

type Option = {
    value: string | number;
    label: string;
};

type Props = {
    slot?: Slot | null;
    onClose: () => void;
    estados: Option[];
    origems: Option[];
    periodos: Option[];
    modalidades: Option[];
    salas: Sala[];
    sala?: Sala | null;
};

type FormData = {
    origem: string;
    periodo: string;
    modalidade: string;
    data: string;
    hora_inicio: string;
    hora_fim_prevista: string;
    sala_id: number | string;
    estado: string;
    observacoes: string;
};

export default function CreateOrEditSlotModal({
    slot,
    onClose,
    estados,
    salas,
    origems,
    periodos,
    modalidades,
    sala = null,
}: Props) {
    const editing = Boolean(slot);

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [form, setForm] = useState<FormData>({
        origem: slot?.origem ?? '',
        periodo: slot?.periodo ?? '',
        modalidade: slot?.modalidade ?? '',
        data: slot?.data ?? '',
        hora_inicio: slot?.hora_inicio ?? '',
        hora_fim_prevista: slot?.hora_fim_prevista ?? '',
        sala_id:
            slot?.sala_id ??
            sala?.id ??
            '',
        estado: slot?.estado ?? '',
        observacoes: slot?.observacoes ?? '',
    });

    const updateField = <K extends keyof FormData>(
        field: K,
        value: FormData[K],
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        setErrors((current) => ({
            ...current,
            [field]: '',
        }));
    };

    const submit = () => {
        setLoading(true);
        setErrors({});

        const payload = {
            origem: form.origem,
            periodo: form.periodo,
            modalidade: form.modalidade,
            data: form.data,
            hora_inicio: form.hora_inicio,
            hora_fim_prevista: form.hora_fim_prevista,
            sala_id: Number(form.sala_id),
            estado: form.estado,
            observacoes: form.observacoes,
        };

        const options = {
            preserveScroll: true,

            onSuccess: () => {
                toast.success(
                    editing
                        ? 'Slot atualizado com sucesso!'
                        : 'Slot criado com sucesso!',
                );

                onClose();
            },

            onError: (validationErrors: Record<string, string>) => {
                setErrors(validationErrors);

                toast.error(
                    'Verifique os dados introduzidos.',
                );
            },

            onFinish: () => {
                setLoading(false);
            },
        };

        if (editing && slot) {
            router.put(
                `/slots/${slot.id}`,
                payload,
                options,
            );
        } else {
            router.post(
                '/slots',
                payload,
                options,
            );
        }
    };

    /**
     * Transformamos as salas para o formato esperado
     * pelo AppSelectField.
     */
    const salaOptions: Option[] = salas.map((sala) => ({
        value: sala.id,
        label: sala.nome_sala,
    }));

    return (
        <AppModal
            open
            onClose={onClose}
            title={
                editing
                    ? 'Editar Slot'
                    : 'Criar Slot'
            }
        >
            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                    <AppSelectField
                        label="Origem"
                        value={form.origem}
                        onChange={(value) =>
                            updateField(
                                'origem',
                                String(value),
                            )
                        }
                        error={errors.origem}
                        options={origems}
                    />

                    <AppSelectField
                        label="Período"
                        value={form.periodo}
                        onChange={(value) =>
                            updateField(
                                'periodo',
                                String(value),
                            )
                        }
                        error={errors.periodo}
                        options={periodos}
                    />

                    <AppSelectField
                        label="Modalidade"
                        value={form.modalidade}
                        onChange={(value) =>
                            updateField(
                                'modalidade',
                                String(value),
                            )
                        }
                        error={errors.modalidade}
                        options={modalidades}
                    />

                    <AppInputField
                        label="Data"
                        type="date"
                        value={form.data}
                        onChange={(value) =>
                            updateField(
                                'data',
                                String(value),
                            )
                        }
                        error={errors.data}
                    />

                    <AppInputField
                        label="Hora Início"
                        type="time"
                        value={form.hora_inicio}
                        onChange={(value) =>
                            updateField(
                                'hora_inicio',
                                String(value),
                            )
                        }
                        error={errors.hora_inicio}
                    />

                    <AppInputField
                        label="Hora Fim Prevista"
                        type="time"
                        value={
                            form.hora_fim_prevista
                        }
                        onChange={(value) =>
                            updateField(
                                'hora_fim_prevista',
                                String(value),
                            )
                        }
                        error={
                            errors.hora_fim_prevista
                        }
                    />

                    <AppSelectField
                        label="Sala"
                        value={form.sala_id}
                        disabled={Boolean(sala)}
                        onChange={(value) =>
                            updateField(
                                'sala_id',
                                Number(value),
                            )
                        }
                        error={errors.sala_id}
                        options={salaOptions}
                    />

                    <AppSelectField
                        label="Estado"
                        value={form.estado}
                        onChange={(value) =>
                            updateField(
                                'estado',
                                String(value),
                            )
                        }
                        error={errors.estado}
                        options={estados}
                    />
                </div>

                <AppTextareaField
                    label="Observações"
                    value={form.observacoes}
                    onChange={(value) =>
                        updateField(
                            'observacoes',
                            String(value),
                        )
                    }
                    error={errors.observacoes}
                />

                <div className="flex justify-end gap-3 border-t pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="button"
                        onClick={submit}
                        disabled={loading}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                        {loading
                            ? 'A guardar...'
                            : editing
                              ? 'Guardar alterações'
                              : 'Criar slot'}
                    </Button>
                </div>
            </div>
        </AppModal>
    );
}
