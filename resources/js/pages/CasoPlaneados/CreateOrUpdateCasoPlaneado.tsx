import { AppCheckboxField } from '@/components/app/app-check-box-field';
import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppModalForm } from '@/components/app/app-modal-form';
import { AppTextareaField } from '@/components/app/app-textarea-field';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import type { CasoPlaneado, Slot, User } from './../../types/types';

type Props = {
    episodio?: { id: number } | null;
    users: User[];
    slots: Pick<Slot, 'id' | 'nome_slot'>[];
    casoPlaneado?: CasoPlaneado | null;
    onClose: () => void;
    onCreated: (casoPlaneado: CasoPlaneado) => void;
};

type FormData = {
    id?: number;
    slot_id: number;
    episodio_id?: number;
    origem: string;
    procedimento_previsto: string;
    duracao_prevista_min: string;
    anestesia_apto: boolean;
    cama_destino: string;
    internamento_em: string;
    cirurgiao_id: number;
    observacoes: string;
};

export default function CreateOrUpdateCasoPlaneado({ casoPlaneado, users, onClose, onCreated, slots, episodio }: Props) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const isEdit = !!casoPlaneado;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrors({});

        const payload = { ...form };

        const options = {
            preserveScroll: true,

            onSuccess: () => {
                toast.success(isEdit ? 'Caso planeado atualizado com sucesso!' : 'Caso planeado criado com sucesso!');
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

        if (isEdit) {
            router.put(`/caso-planeados/${casoPlaneado!.id}`, payload, options);
        } else {
            router.post('/caso-planeados', payload, options);
        }
    };

    const [form, setForm] = useState({
        ordem: casoPlaneado?.ordem ?? 0,
        slot_id: casoPlaneado?.slot_id ?? 0,
        episodio_id: casoPlaneado?.episodio_id ?? episodio?.id ?? 0,
        procedimento_previsto: casoPlaneado?.procedimento_previsto ?? '',
        duracao_prevista_min: casoPlaneado?.duracao_prevista_min ?? '',
        anestesia_apto: casoPlaneado?.anestesia_apto ?? false,
        cama_destino: casoPlaneado?.cama_destino ?? '',
        internamento_em: casoPlaneado?.internamento_em ?? '',
        cirurgiao_id: casoPlaneado?.cirurgiao_id ?? 0,
        observacoes: casoPlaneado?.observacoes ?? '',
    });

    return (
        <AppModalForm
            open
            title={isEdit ? 'Editar Caso Planeado' : 'Novo Caso Planeado'}
            description={isEdit ? 'Atualize os dados do caso planeado.' : 'Introduza os dados do caso planeado.'}
            onClose={onClose}
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel={isEdit ? 'Guardar alterações' : 'Criar caso planeado'}
        >
            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <AppInputField
                        label="Ordem"
                        type="number"
                        value={form.ordem}
                        onChange={(value) => setForm({ ...form, ordem: Number(value) })}
                        error={errors.ordem}
                    />
                    <AppSelectField
                        label="Slot"
                        value={form.slot_id}
                        onChange={(value) => setForm({ ...form, slot_id: Number(value) })}
                        error={errors.slot_id}
                        options={slots.map((slot) => ({ value: slot.id, label: slot.nome_slot }))}
                    />
                    <AppInputField
                        label="Procedimento Previsto"
                        value={form.procedimento_previsto}
                        onChange={(value) => setForm({ ...form, procedimento_previsto: value })}
                        error={errors.procedimento_previsto}
                    />
                    <AppInputField
                        label="Duração Prevista (min)"
                        type="number"
                        value={form.duracao_prevista_min}
                        onChange={(value) => setForm({ ...form, duracao_prevista_min: Number(value) })}
                        error={errors.duracao_prevista_min}
                    />
                    <AppCheckboxField
                        label="Anestesia Apto"
                        checked={form.anestesia_apto}
                        onChange={(value) => setForm({ ...form, anestesia_apto: Boolean(value) })}
                        error={errors.anestesia_apto}
                    />
                    <AppInputField
                        label="Cama Destino"
                        value={form.cama_destino}
                        onChange={(value) => setForm({ ...form, cama_destino: value })}
                        error={errors.cama_destino}
                    />
                    <AppInputField
                        label="Internamento Em"
                        type="date"
                        value={form.internamento_em}
                        onChange={(value) => setForm({ ...form, internamento_em: value })}
                        error={errors.internamento_em}
                    />
                    <AppSelectField
                        label="Cirurgião"
                        value={form.cirurgiao_id}
                        onChange={(value) => setForm({ ...form, cirurgiao_id: Number(value) })}
                        error={errors.cirurgiao_id}
                        options={users.map((user) => ({ value: user.id, label: user.name }))}
                    />
                </div>
                <div>
                    <AppTextareaField
                        label="Observações"
                        value={form.observacoes}
                        onChange={(value) => setForm({ ...form, observacoes: value })}
                        error={errors.observacoes}
                    />
                </div>
            </div>
        </AppModalForm>
    );
}
