import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

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

    const [errors, setErrors] = useState<Record<string, string>>({});

    const submit = () => {
        if (isEdit) {
            form.put(`/doentes/${doente!.id}`, {
                onSuccess: () => {
                    onClose();
                    toast.success('Doente atualizado com sucesso!');
                },
                onError: () => {
                    toast.error('Erro ao atualizar o doente.');
                }
                
            });
        } else {
            form.post('/doentes', {
                onSuccess: () => {
                    onClose();
                    toast.success('Doente criado com sucesso!');
                },
                onError: () => {
                    toast.error('Erro ao atualizar o doente.');
                    setErrors(form.errors);
                }

            });
        }
    };

    console.log('Form errors:', form.errors);

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
                        {form.errors.nome && (
                            <p className="text-red-500 text-sm mt-1">{form.errors.nome}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">PU</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={form.data.pu}
                            onChange={(e) => form.setData('pu', e.target.value)}
                        />
                        {form.errors.pu && (
                            <p className="text-red-500 text-sm mt-1">{form.errors.pu}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
                        <input
                            type="date"
                            className="w-full border rounded p-2"
                            value={form.data.data_nascimento}
                            onChange={(e) => form.setData('data_nascimento', e.target.value)}
                        />
                        {form.errors.data_nascimento && (
                            <p className="text-red-500 text-sm mt-1">{form.errors.data_nascimento}</p>
                        )}
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
                        {form.errors.sexo && (
                            <p className="text-red-500 text-sm mt-1">{form.errors.sexo}</p>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        className="px-4 py-2 rounded bg-gray-600 dark:bg-neutral-700"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>

                    <Button
                        className="px-4 py-2 rounded bg-blue-600 text-white"
                        onClick={submit}
                    >
                        {isEdit ? 'Guardar' : 'Criar'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
