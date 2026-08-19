import { AppModal } from '@/components/app/app-modal';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { useState } from 'react';

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
    nome: string;
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

        const method = isEdit ? router.put : router.post;

        method(url, form, {
            onFinish: () => setLoading(false),
            onSuccess: () => onClose(),
        });
    };

    return (
        <AppModal open={true} onClose={onClose} title={isEdit ? 'Editar Episódio' : 'Criar Episódio'} maxWidth="5xl">
            {/* Form */}
            <div className="space-y-4">
                {/* Doente */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm">Doente</label>
                        <select
                            value={form.doente_id}
                            onChange={(e) => setForm({ ...form, doente_id: e.target.value })}
                            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
                        >
                            <option value="">Selecione...</option>
                            {doentes.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        {/* Tipo */}
                        <label className="mb-1 block text-sm">Tipo</label>
                        <select
                            value={form.tipo}
                            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
                        >
                            <option value="">Selecione...</option>
                            <option value="ONCOLOGICO">Oncológico</option>
                            <option value="BENIGNO">Benigno</option>
                            <option value="DII">DII</option>
                            <option value="FUNCIONAL">Funcional</option>
                            <option value="OUTRO">Outro</option>
                        </select>
                    </div>
                </div>

                {/* Diagnóstico */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm">Diagnóstico</label>
                        <input
                            type="text"
                            value={form.diagnostico}
                            onChange={(e) => setForm({ ...form, diagnostico: e.target.value })}
                            className="w-full rounded-lg border p-2"
                        />
                    </div>
                    <div>
                        {/* CID10 */}
                        <label className="mb-1 block text-sm">CID10</label>
                        <input
                            type="text"
                            value={form.cid10}
                            onChange={(e) => setForm({ ...form, cid10: e.target.value })}
                            className="w-full rounded-lg border p-2"
                        />
                    </div>
                </div>
                {/* Datas */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm">Data Diagnóstico</label>
                        <input
                            type="date"
                            value={form.data_diagnostico}
                            onChange={(e) => setForm({ ...form, data_diagnostico: e.target.value })}
                            className="w-full rounded-lg border p-2"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm">Centro Referência</label>
                        <input
                            type="checkbox"
                            checked={form.centro_referencia}
                            onChange={(e) => setForm({ ...form, centro_referencia: e.target.checked })}
                            className="mr-2"
                        />
                        <span>Sim</span>
                    </div>
                </div>

                {/* PAI */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm">PAI Entrada</label>
                        <input
                            type="date"
                            value={form.pai_entrada}
                            onChange={(e) => setForm({ ...form, pai_entrada: e.target.value })}
                            className="w-full rounded-lg border p-2"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm">PAI Saída</label>
                        <input
                            type="date"
                            value={form.pai_saida}
                            onChange={(e) => setForm({ ...form, pai_saida: e.target.value })}
                            className="w-full rounded-lg border p-2"
                        />
                    </div>
                </div>

                {/* Motivo Saída */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm">Motivo Saída</label>
                        <input
                            type="text"
                            value={form.motivo_saida}
                            onChange={(e) => setForm({ ...form, motivo_saida: e.target.value })}
                            className="w-full rounded-lg border p-2"
                        />
                    </div>
                    <div>
                        {/* User Responsável */}
                        <label className="mb-1 block text-sm">Responsável</label>
                        <select
                            value={form.user_id}
                            onChange={(e) => setForm({ ...form, user_id: e.target.value })}
                            className="w-full rounded-lg border px-3 py-2"
                        >
                            <option value="">Selecione...</option>
                            {profissionais.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Estado */}
                <div>
                    <label className="mb-1 block text-sm">Estado</label>
                    <select
                        value={form.estado}
                        onChange={(e) => setForm({ ...form, estado: e.target.value })}
                        className="w-full rounded-lg border px-3 py-2"
                    >
                        <option value="ATIVO">Ativo</option>
                        <option value="INATIVO">Inativo</option>
                        <option value="ENCERRADO">Encerrado</option>
                    </select>
                </div>

                {/* Observações */}
                <div>
                    <label className="mb-1 block text-sm">Observações</label>
                    <textarea
                        value={form.observacoes}
                        onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
                        className="h-24 w-full rounded-lg border p-2"
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
                <Button onClick={submit} disabled={loading} className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
                    {loading ? 'A guardar...' : isEdit ? 'Guardar Alterações' : 'Criar Episódio'}
                </Button>
            </div>
        </AppModal>
    );
}
