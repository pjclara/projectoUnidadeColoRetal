import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppModalForm } from '@/components/app/app-modal-form';
import { AppTextareaField } from '@/components/app/app-textarea-field';

type FormData = {
    id: number;
    episodio_id: number;
    tipo: string;
    data_proposta: string;
    data_inicio: string;
    data_fim: string;
    intencao: string;
    observacoes: string;
};

export default function ModalEditTratamento({
    open,
    onClose,
    form,
    errors,
    updateField,
    submitEdit,
    saving,
}: {
    open: boolean;
    onClose: () => void;
    form: FormData;
    errors: Record<string, string>;
    updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
    submitEdit: () => void;
    saving: boolean; // <-- ADICIONADO
}) {
    return (
        <AppModalForm
            open={open}
            onClose={onClose}
            onSubmit={(event) => { event.preventDefault(); submitEdit(); }}
            loading={saving}
            title="Editar Tratamento"
            maxWidth="5xl"
            submitLabel="Guardar alterações"
        >
            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                    <AppSelectField
                        label="Tipo"
                        value={form.tipo}
                        onChange={(value) => updateField('tipo', String(value))}
                        error={errors.tipo}
                        options={[
                            { label: 'Quimioterapia', value: 'quimioterapia' },
                            { label: 'Radioterapia', value: 'radioterapia' },
                            { label: 'Imunoterapia', value: 'imunoterapia' },
                            { label: 'Cirurgia', value: 'cirurgia' },
                        ]}
                    />
                    <AppInputField
                        label="Data da proposta"
                        type="date"
                        value={form.data_proposta}
                        onChange={(value) => updateField('data_proposta', value)}
                        error={errors.data_proposta}
                    />

                    <AppInputField
                        label="Data de início"
                        type="date"
                        value={form.data_inicio}
                        onChange={(value) => updateField('data_inicio', value)}
                        error={errors.data_inicio}
                    />

                    <AppInputField
                        label="Data de fim"
                        type="date"
                        value={form.data_fim}
                        onChange={(value) => updateField('data_fim', value)}
                        error={errors.data_fim}
                    />
                    <AppSelectField
                        label="Intenção"
                        value={form.intencao}
                        onChange={(value) => updateField('intencao',  String(value))}
                        error={errors.intencao}
                        options={[{ label: 'Curativo', value: 'curativo' },
                            { label: 'Paliativo', value: 'paliativo' },
                        ]}
                    />
                </div>

                <AppTextareaField
                    label="Observações"
                    value={form.observacoes}
                    onChange={(value) => updateField('observacoes', value)}
                    error={errors.observacoes}
                />

            </div>
        </AppModalForm>
    );
}
