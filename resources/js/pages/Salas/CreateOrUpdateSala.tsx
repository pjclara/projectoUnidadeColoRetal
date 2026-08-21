import { AppCheckboxField } from '@/components/app/app-check-box-field';
import { AppInputField } from '@/components/app/app-input-field';
import { AppModal } from '@/components/app/app-modal';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

type Sala = {
    id: number;
    polo: string;
    codigo: string;
    designacao: string;
    ativa: boolean;
};

type Props = {
    sala?: Sala | null; // null para criar, objeto para editar
    onClose: () => void;
};

export function CreateOrEditSalaModal({ sala, onClose }: Props) {
    const editing = !!sala;

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [form, setForm] = useState({
        polo: sala?.polo || '',
        codigo: sala?.codigo || '',
        designacao: sala?.designacao || '',
        ativa: sala?.ativa ?? true,
    });

    const submit = () => {
        setLoading(true);
        setErrors({});

        const payload = { ...form };

        const options = {
            preserveScroll: true,

            onSuccess: () => {
                toast.success(editing ? 'Sala atualizada com sucesso!' : 'Sala criada com sucesso!');
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
            router.put(`/salas/${sala!.id}`, payload, options);
        } else {
            router.post('/salas', payload, options);
        }
    };

    return (
        <AppModal
            open
            onClose={onClose}
            title={editing ? 'Editar Sala' : 'Criar Sala'}
            maxWidth="lg"
        >
            <div className="space-y-4">
                <AppInputField
                    label="Polo"
                    value={form.polo}
                    error={errors.polo}
                    onChange={(value) => setForm({ ...form, polo: String(value) })}
                />

                <AppInputField
                    label="Código"
                    value={form.codigo}
                    error={errors.codigo}
                    onChange={(value) => setForm({ ...form, codigo: String(value) })}
                />

                <AppInputField
                    label="Designação"
                    value={form.designacao}
                    error={errors.designacao}
                    onChange={(value) => setForm({ ...form, designacao: String(value) })}
                />

                <AppCheckboxField
                    label="Ativa"
                    checked={form.ativa}
                    onChange={(value) => setForm({ ...form, ativa: Boolean(value) })}
                />
            </div>

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
                    {loading ? 'A guardar...' : editing ? 'Guardar alterações' : 'Criar sala'}
                </Button>
            </div>
        </AppModal>
    );
}
