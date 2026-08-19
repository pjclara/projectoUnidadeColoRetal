import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { AppPageHeader } from '@/components/app/app-page-header';


import type {
    Doente,
    Episodio,
} from './types';
import { AtendimentoWizard } from './AtendimentoWizard';

type Props = {
    doentes: Doente[];
    episodios: Episodio[];
};

export default function Novo({
    doentes,
    episodios,
}: Props) {
    return (
        <AppLayout>
            <Head title="Novo atendimento" />

            <div className="p-6">
                <AppPageHeader
                    title="Novo atendimento"
                    description="Selecione o doente e registe o episódio."
                />

                <div className="mt-8">
                    <AtendimentoWizard
                        doentes={doentes}
                        episodios={episodios}
                    />
                </div>
            </div>
        </AppLayout>
    );
}