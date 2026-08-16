import { useForm } from '@inertiajs/react';

type Props = {
    doente?: {
        id: number;
        nome?: string | null;
        pu?: string | null;
        data_nascimento?: string | null;
        sexo?: string | null;
    };
    onClose: () => void;
};

export default function CreateOrUpdateDoente({ doente, onClose }: Props) {
    const isEdit = Boolean(doente);

    const form = useForm({
        nome: doente?.nome ?? '',
        pu: doente?.pu ?? '',
        data_nascimento: doente?.data_nascimento ?? '',
        sexo: doente?.sexo ?? '',
    });

    const submit = () => {
        if (isEdit) {
            form.put(`/doentes/${doente!.id}`, {
                onSuccess: onClose,
            });
        } else {
            form.post('/doentes', {
                onSuccess: onClose,
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-xl w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">
                    {isEdit ? 'Editar Doente' : 'Criar Doente'}
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={form.data.nome}
                            onChange={(e) => form.setData('nome', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">PU</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={form.data.pu}
                            onChange={(e) => form.setData('pu', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
                        <input
                            type="date"
                            className="w-full border rounded p-2"
                            value={form.data.data_nascimento}
                            onChange={(e) => form.setData('data_nascimento', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Sexo</label>
                        <select
                            className="w-full border rounded p-2"
                            value={form.data.sexo}
                            onChange={(e) => form.setData('sexo', e.target.value)}
                        >
                            <option value="">Selecionar…</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="O">Outro</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded bg-neutral-300 dark:bg-neutral-700"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        className="px-4 py-2 rounded bg-blue-600 text-white"
                        onClick={submit}
                    >
                        {isEdit ? 'Guardar' : 'Criar'}
                    </button>
                </div>
            </div>
        </div>
    );
}
