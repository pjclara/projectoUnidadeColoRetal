import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface AppModalProps {
    open: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function AppModal({
    open,
    title,
    children,
    onClose,
    maxWidth = 'xl',
}: AppModalProps) {
    if (!open) {
        return null;
    }

    const widths = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
        >
            <div
                className={`w-full ${widths[maxWidth]} rounded-2xl border border-neutral-300/40 bg-white p-6 shadow-xl dark:border-neutral-700 dark:bg-neutral-900`}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        {title}
                    </h2>

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                    >
                        Fechar
                    </Button>
                </div>

                {children}
            </div>
        </div>
    );
}