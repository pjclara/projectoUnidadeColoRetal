import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppModalForm } from '@/components/app/app-modal-form';
import { AppTextareaField } from '@/components/app/app-textarea-field';

type FormData = {
    id: number;
    data_pedido: string;
    data_discussao: string;
    estadio_clinico: string | number;
    decisao: string;
};

export default function ModalEditCDT({
    open,
    onClose,
    cdt,
    errors,
    onFieldChange,
    onSubmit,
    processing,
}: {
    open: boolean;
    onClose: () => void;
    cdt: FormData;
    errors: Record<string, string>;
    onFieldChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
    onSubmit: () => void;
    processing: boolean; // <-- ADICIONADO
}) {
    return (
        <AppModalForm
            open={open}
            onClose={onClose}
            onSubmit={(event) => { event.preventDefault(); onSubmit(); }}
            loading={processing}
            title="Editar CDT"
            maxWidth="5xl"
            submitLabel="Guardar alterações"
        >
            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                    <AppInputField
                        label="Data do pedido"
                        type="date"
                        value={cdt.data_pedido}
                        onChange={(value) => onFieldChange('data_pedido', value)}
                        error={errors.data_pedido}
                    />

                    <AppInputField
                        label="Data da discussão"
                        type="date"
                        value={cdt.data_discussao}
                        onChange={(value) => onFieldChange('data_discussao', value)}
                        error={errors.data_discussao}
                    />

                    <AppSelectField
                        label="Estadio clínico"
                        value={cdt.estadio_clinico}
                        onChange={(value) => onFieldChange('estadio_clinico', value)}
                        error={errors.estadio_clinico}
                        options={[
                            { label: 'I', value: 'I' },
                            { label: 'II', value: 'II' },
                            { label: 'III', value: 'III' },
                            { label: 'IV', value: 'IV' },
                        ]}
                    />
                </div>

                <AppTextareaField label="Decisão" value={cdt.decisao} onChange={(value) => onFieldChange('decisao', value)} error={errors.decisao} />

            </div>
        </AppModalForm>
    );
}
