import { Head } from '@inertiajs/react';

import { AppPageHeader } from '@/components/app/app-page-header';
import AppLayout from '@/layouts/app-layout';

import { EpisodioWizard } from './EpisodioWizard';
import type { Doente, Episodio } from './types';

type Props = {
    doentes: Doente[];
    episodios: Episodio[];
};

export default function Novo({ doentes, episodios }: Props) {
    return (
        <AppLayout>
            <Head title="Novo episódio" />

            <div className="p-6">
                <AppPageHeader title="Novo episódio" description="Selecione o doente e registe o episódio." />

                <div className="mt-8">
                    <EpisodioWizard doentes={doentes} episodios={episodios} />
                </div>
            </div>
        </AppLayout>
    );
}
