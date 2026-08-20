import { AppCheckboxField } from '@/components/app/app-check-box-field';
import { AppInputField } from '@/components/app/app-input-field';
import { AppSelectField } from '@/components/app/app-input-select';
import { AppModal } from '@/components/app/app-modal';
import { AppTextareaField } from '@/components/app/app-textarea-field';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

type Episodio = {
    id: string | number;
    doente_id?: string | number | null;
    tipo?: string | null;
    diagnostico?: string | null;
    cid10?: string | null;
    data_diagnostico?: string | null;
    centro_referencia?: boolean | null;
    pai_entrada?: string | null;
    pai_saida?: string | null;
    motivo_saida?: string | null;
    user_id?: string | number | null;
    estado?: string | null;
    observacoes?: string | null;
};

type Option = {
    id: string | number;
    name: string;
};

type Props = {
    episodio?: Episodio | null;
    doentes?: Option[];
    profissionais?: Option[];
    onClose: () => void;
};

export default function CreateOrUpdateEpisodio({ episodio = null, doentes = [], profissionais = [], onClose }: Props) {
    const isEdit = !!episodio;

    const [form, setForm] = useState({
        doente_id: episodio?.doente_id ?? '',
        tipo: episodio?.tipo ?? '',
        diagnostico: episodio?.diagnostico ?? '',
        cid10: episodio?.cid10 ?? '',
        data_diagnostico: episodio?.data_diagnostico ?? '',
        centro_referencia: episodio?.centro_referencia ?? false,
        pai_entrada: episodio?.pai_entrada ?? '',
        pai_saida: episodio?.pai_saida ?? '',
        motivo_saida: episodio?.motivo_saida ?? '',
        user_id: episodio?.user_id ?? '',
        estado: episodio?.estado ?? 'ATIVO',
        observacoes: episodio?.observacoes ?? '',
    });

    const [loading, setLoading] = useState(false);

    const submit = () => {
        setLoading(true);

        const url = isEdit ? `/episodios/${episodio.id}` : `/episodios`;

        const options = {
            onFinish: () => setLoading(false),
            onSuccess: () => {
                onClose();
                toast.success(isEdit ? 'Episódio atualizado com sucesso!' : 'Episódio criado com sucesso!');
            },
        };

        if (isEdit) {
            router.put(url, form, options);
        } else {
            router.post(url, form, options);
        }
    };

    return (
        (
            <AppModal open={true} onClose={onClose} title={isEdit ? 'Editar Episódio' : 'Criar Episódio'} maxWidth="5xl">
                {/* Form */}
                <div className="space-y-4">
                    {/* Tipo */}
                    <div className="grid grid-cols-2 gap-4">
                        <AppSelectField
                            label="Tipo"
                            value={form.tipo}
                            onChange={(value) => setForm({ ...form, tipo: String(value) })}
                            options={[
                                { value: 'ONCOLOGICO', label: 'Oncológico' },
                                { value: 'BENIGNO', label: 'Benigno' },
                                { value: 'DII', label: 'DII' },
                                { value: 'FUNCIONAL', label: 'Funcional' },
                                { value: 'OUTRO', label: 'Outro' },
                            ]}
                        />

                        {/* Diagnóstico */}
                        <AppInputField
                            label="Diagnóstico"
                            value={form.diagnostico}
                            onChange={(value) => setForm({ ...form, diagnostico: String(value) })}
                        />
                        <AppInputField label="CID-10" value={form.cid10} onChange={(value) => setForm({ ...form, cid10: String(value) })} />
                        {/* Datas */}
                        <AppInputField
                            label="Data Diagnóstico"
                            type="date"
                            value={form.data_diagnostico}
                            onChange={(value) => setForm({ ...form, data_diagnostico: String(value) })}
                        />

                        <AppCheckboxField
                            label="Centro de Referência"
                            checked={Boolean(form.centro_referencia)}
                            onChange={(value: boolean) => setForm({ ...form, centro_referencia: Boolean(value) })}
                        />

                        {/* PAI */}
                        <AppInputField
                            label="PAI Entrada"
                            type="date"
                            value={form.pai_entrada}
                            onChange={(value) => setForm({ ...form, pai_entrada: String(value) })}
                        />

                        <AppInputField
                            label="PAI Saída"
                            type="date"
                            value={form.pai_saida}
                            onChange={(value) => setForm({ ...form, pai_saida: String(value) })}
                        />

                        {/* Motivo Saída */}
                        <AppInputField
                            label="Motivo Saída"
                            value={form.motivo_saida}
                            onChange={(e) => setForm({ ...form, motivo_saida: String(e) })}
                        />
                        <AppSelectField
                            label="Profissional"
                            value={form.user_id}
                            onChange={(value) => setForm({ ...form, user_id: String(value) })}
                            options={profissionais.map((profissional) => ({
                                value: profissional.id,
                                label: profissional.name,
                            }))}
                        />

                        {/* Estado */}
                        <AppSelectField
                            label="Estado"
                            value={form.estado}
                            onChange={(value) => setForm({ ...form, estado: String(value) })}
                            options={[
                                { value: 'ATIVO', label: 'Ativo' },
                                { value: 'INATIVO', label: 'Inativo' },
                            ]}
                        />
                    </div>

                    <div>
                        {/* Observações */}
                        <AppTextareaField
                            label="Observações"
                            value={form.observacoes}
                            onChange={(value) => setForm({ ...form, observacoes: String(value) })}
                        />
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex justify-end">
                        <Button onClick={submit} disabled={loading} className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
                            {loading ? 'A guardar...' : isEdit ? 'Guardar Alterações' : 'Criar Episódio'}
                        </Button>
                    </div>
                </div>
            </AppModal>
        )
    );
}
