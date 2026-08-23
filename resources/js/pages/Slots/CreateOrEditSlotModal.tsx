import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppModal } from '@/components/app/app-modal';
import { AppTextareaField } from '@/components/app/app-textarea-field';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

type Slot = {
    id: number;
    polo?: string;
    periodo?: string;
    modalidade?: string;
    data: string;
    sala_id: number;
    hora_inicio: string;
    hora_fim_prevista: string;
    estado: string;
    origem: string;
    observacoes: string;
};

type Props = {
    slot?: Slot | null;
    onClose: () => void;
    estados: { value: string; label: string }[];
    origens: { value: string; label: string }[];
    salas: { designacao: string; id: number }[];
};

export default function CreateOrEditSlotModal({ slot, onClose, estados, salas, origens }: Props) {
    const editing = !!slot;
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [form, setForm] = useState({
        polo: slot?.polo || '',
        periodo: slot?.periodo || '',
        modalidade: slot?.modalidade || '',
        data: slot?.data || '',
        sala_id: slot?.sala_id || 0,
        hora_inicio: slot?.hora_inicio || '',
        hora_fim_prevista: slot?.hora_fim_prevista || '',
        estado: slot?.estado || '',
        origem: slot?.origem || '',
        observacoes: slot?.observacoes || '',
    });

    const salaOptions = Object.entries(salas).map(([id, label]) => ({
        value: Number(id),
        label: String(label),
    }));

    const submit = () => {
        setLoading(true);
        setErrors({});

        const payload = { ...form };

        const options = {
            preserveScroll: true,

            onSuccess: () => {
                toast.success(editing ? 'Slot atualizado com sucesso!' : 'Slot criado com sucesso!');
                onClose();
            },

            onError: (validationErrors: Record<string, string>) => {
                setErrors(validationErrors);
                toast.error('Verifique os dados introduzidos.');
            },

            onFinish: () => {
                setLoading(false);
            },
        };

        if (editing) {
            router.put(`/slots/${slot!.id}`, payload, options);
        } else {
            router.post('/slots', payload, options);
        }
    };

    return (
        <AppModal open onClose={onClose} title={editing ? 'Editar Slot' : 'Criar Slot'} maxWidth="lg">
            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <AppInputField
                        label="Período"
                        value={form.periodo}
                        onChange={(value) => setForm({ ...form, periodo: String(value) })}
                        error={errors.periodo}
                    />
                    <AppInputField
                        label="Modalidade"
                        value={form.modalidade}
                        onChange={(value) => setForm({ ...form, modalidade: String(value) })}
                        error={errors.modalidade}
                    />
                    <AppInputField
                        label="Polo"
                        value={form.polo}
                        onChange={(value) => setForm({ ...form, polo: String(value) })}
                        error={errors.polo}
                    />
                    <AppInputField
                        label="Data"
                        type="date"
                        value={form.data}
                        onChange={(value) => setForm({ ...form, data: String(value) })}
                        error={errors.data}
                    />
                    <AppSelectField
                        label="Sala"
                        value={form.sala_id}
                        onChange={(value) => setForm({ ...form, sala_id: Number(value) })}
                        error={errors.sala_id}
                        options={salaOptions}
                    />
                    <AppInputField
                        label="Hora Início"
                        type="time"
                        value={form.hora_inicio}
                        onChange={(value) => setForm({ ...form, hora_inicio: String(value) })}
                        error={errors.hora_inicio}
                    />
                    <AppInputField
                        label="Hora Fim Prevista"
                        type="time"
                        value={form.hora_fim_prevista}
                        onChange={(value) => setForm({ ...form, hora_fim_prevista: String(value) })}
                        error={errors.hora_fim_prevista}
                    />
                    <AppSelectField
                        label="Estado"
                        value={form.estado}
                        onChange={(value) => setForm({ ...form, estado: String(value) })}
                        error={errors.estado}
                        options={estados}
                    />
                    <AppSelectField
                        label="Origem"
                        value={form.origem}
                        onChange={(value) => setForm({ ...form, origem: String(value) })}
                        error={errors.origem}
                        options={origens}
                    />
                    <AppTextareaField
                        label="Observações"
                        value={form.observacoes}
                        onChange={(value) => setForm({ ...form, observacoes: String(value) })}
                        error={errors.observacoes}
                    />
                </div>

                <div className="flex justify-end gap-3 border-t pt-6">
                    <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>

                    <Button type="button" onClick={submit} disabled={loading} className="bg-blue-600 text-white hover:bg-blue-700">
                        {loading ? 'A guardar...' : editing ? 'Guardar alterações' : 'Criar slot'}
                    </Button>
                </div>
            </div>
        </AppModal>
    );
}
