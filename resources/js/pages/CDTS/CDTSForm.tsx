import { AppInputField } from '@/components/app/app-input-field';
import { AppTextareaField } from '@/components/app/app-textarea-field';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type FormData = {
    id?: number;
    data_pedido: string;
    data_discussao: string;
    estadio_clinico: string;
    decisao: string;
};

export default function CDTForm({
    cdt,
    errors,
    onFieldChange,
}: {
    cdt: FormData;
    errors: Record<string, string>;
    onFieldChange: (field: keyof FormData, value: any) => void;
}) 
{
    const { data, setData, post, processing } = useForm({
        data_pedido: normalizeDate(cdt?.data_pedido),
        data_discussao: normalizeDate(cdt?.data_discussao),
        estadio_clinico: cdt?.estadio_clinico ?? '',
        decisao: cdt?.decisao ?? '',
    });

    function normalizeDate(date: string | null | undefined) {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        return d.toISOString().slice(0, 10); // YYYY-MM-DD
    }

    function updateField(field: string, value: any) {
        setData((current) => ({ ...current, [field]: value }));
        onFieldChange(field as keyof FormData, value);
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post(cdt ? `/cdts/${cdt.id}` : '/cdts', {
            preserveScroll: true,
        });
    }

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
                <AppInputField
                    label="Data do pedido"
                    type="date"
                    value={data.data_pedido}
                    onChange={(value) => updateField('data_pedido', value)}
                    error={errors.data_pedido}
                />

                <AppInputField
                    label="Data da discussão"
                    type="date"
                    value={data.data_discussao}
                    onChange={(value) => updateField('data_discussao', value)}
                    error={errors.data_discussao}
                />

                <AppInputField
                    label="Estádio clínico"
                    value={data.estadio_clinico}
                    onChange={(value) => updateField('estadio_clinico', value)}
                    error={errors.estadio_clinico}
                    placeholder="Ex.: II"
                />
            </div>

            <AppTextareaField label="Decisão" value={data.decisao} onChange={(value) => updateField('decisao', value)} error={errors.decisao} />

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    Guardar CDT
                </Button>
            </div>
        </form>
    );
}
