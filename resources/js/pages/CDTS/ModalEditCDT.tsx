import { AppInputField } from '@/components/app/app-input-field';
import { AppTextareaField } from '@/components/app/app-textarea-field';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type FormData = {
    id: number;
    data_pedido: string;
    data_discussao: string;
    estadio_clinico: string;
    decisao: string;
    profissional_id: number | string;
};

export default function ModalEditCDT({
    open,
    onClose,
    cdt,
    errors,
    onFieldChange,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    cdt: FormData;
    errors: Record<string, string>;
    onFieldChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
    onSubmit: () => void;
}) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Editar CDT</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
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

                        <AppInputField
                            label="Estádio clínico"
                            value={cdt.estadio_clinico}
                            onChange={(value) => onFieldChange('estadio_clinico', value)}
                            error={errors.estadio_clinico}
                            placeholder="Ex.: II"
                        />
                    </div>

                    <AppTextareaField
                        label="Decisão"
                        value={cdt.decisao}
                        onChange={(value) => onFieldChange('decisao', value)}
                        error={errors.decisao}
                    />

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>

                        <Button onClick={onSubmit}>Guardar alterações</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

