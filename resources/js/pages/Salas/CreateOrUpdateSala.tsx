import { AppCheckboxField } from '@/components/app/app-check-box-field';
import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppModalForm } from '@/components/app/app-modal-form';
import { useCrudForm } from '@/hooks/use-crud-form';
import { type FormEvent, useEffect } from 'react';

type Sala = {
    id: number;
    polo: string;
    codigo: string;
    designacao: string;
    ativa: boolean;
};

type Props = {
    sala?: Sala | null; // null para criar, objeto para editar
    poloOptions: { value: string; label: string }[];
    onClose: () => void;
};

export function CreateOrEditSalaModal({ sala, poloOptions, onClose }: Props) {
    const editing = !!sala;

    const initialForm = {
        polo: sala?.polo || '',
        codigo: sala?.codigo || '',
        designacao: sala?.designacao || '',
        ativa: sala?.ativa ?? true,
    };
    const { form, errors, loading, setForm, submit: submitCrud, updateField } = useCrudForm(initialForm);

    useEffect(() => {
        setForm({
            polo: sala?.polo || '',
            codigo: sala?.codigo || '',
            designacao: sala?.designacao || '',
            ativa: sala?.ativa ?? true,
        });
    }, [sala]);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        submitCrud(event, {
            method: editing ? 'put' : 'post',
            url: editing ? `/salas/${sala!.id}` : '/salas',
            successMessage: editing ? 'Sala atualizada com sucesso!' : 'Sala criada com sucesso!',
            onSuccess: onClose,
        });
    };

    return (
        <AppModalForm
            open
            title={editing ? 'Editar Sala' : 'Criar Sala'}
            description="Introduza os dados da sala."
            onClose={onClose}
            onSubmit={submit}
            loading={loading}
            maxWidth="lg"
            submitLabel={editing ? 'Guardar alterações' : 'Criar sala'}
        >
            <div className="space-y-4">
                <AppSelectField
                    label="Polo"
                    value={form.polo}
                    error={errors.polo}
                    options={poloOptions}
                    onChange={(value) => updateField('polo', String(value))}
                />

                <AppInputField
                    label="Código"
                    value={form.codigo}
                    error={errors.codigo}
                    onChange={(value) => updateField('codigo', String(value))}
                />

                <AppInputField
                    label="Designação"
                    value={form.designacao}
                    error={errors.designacao}
                    onChange={(value) => updateField('designacao', String(value))}
                />

                <AppCheckboxField
                    label="Ativa"
                    checked={form.ativa}
                    onChange={(value) => updateField('ativa', Boolean(value))}
                />
            </div>
        </AppModalForm>
    );
}
