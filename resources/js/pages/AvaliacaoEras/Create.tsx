import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import type { AvaliacaoEras, Doente, DoenteFilters, Episodio, Pagination, Tratamento, User } from '../../types/types';

import { AppPageHeader } from '@/components/app/app-page-header';
import { AppWizard, type AppWizardStep } from '@/components/app/app-wizard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { StepConfirmation } from '../Tratamentos/Wizard/StepConfirmation';
import { StepDoente } from '../Tratamentos/Wizard/StepDoente';
import { StepEpisodio } from '../Tratamentos/Wizard/StepEpisodio';
import StepAvaliacaoEras from './StepAvaliacaoEras';

type Props = {
    doentes: Pagination<Doente>;
    selectedDoente: Doente | null;
    episodios: Pagination<Episodio> | null;
    avaliacaoEras: Pagination<AvaliacaoEras> | null;
    users: User[];
    filters: DoenteFilters;
    poloOptions: { value: string; label: string }[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Avaliações ERAS', href: '/avaliacao-eras' },
    { title: 'Nova Avaliação ERAS', href: '/avaliacao-eras/create' },
];

const steps: AppWizardStep[] = [
    { id: 'doente', title: 'Doente', description: 'Procurar ou criar' },
    { id: 'episodio', title: 'Episódio', description: 'Selecionar ou criar' },
    { id: 'avaliacao', title: 'Avaliação ERAS', description: 'Registo clínico' },
    { id: 'confirmacao', title: 'Confirmação', description: 'Concluído' },
];

export default function CreateAvaliacaoErasWizard({ doentes, selectedDoente: initialDoente, episodios, avaliacaoEras, users, filters, poloOptions }: Props) {
    const [currentStep, setCurrentStep] = useState(initialDoente ? 1 : 0);
    const [doente, setDoente] = useState<Doente | null>(initialDoente);
    const [episodio, setEpisodio] = useState<Episodio | null>(null);
    const [tratamento, setTratamento] = useState<Tratamento | null>(null);
    const [avaliacaoEra, setAvaliacaoEra] = useState<AvaliacaoEras | null>(null);

    const selectDoente = (selected: Doente) => {
        setDoente(selected);
        setEpisodio(null);

        router.get('/avaliacao-eras/create', { doente_id: selected.id }, { preserveState: true, preserveScroll: true, replace: true });
    };

    const goToEpisodio = () => setCurrentStep(1);

    const backToDoente = () => {
        setEpisodio(null);
        setCurrentStep(0);
    };

    const goToTratamento = () => setCurrentStep(2);

    const backToEpisodio = () => setCurrentStep(1);

    const finishAvaliacaoEra = (createdAvaliacaoEra: AvaliacaoEras) => {
        setAvaliacaoEra(createdAvaliacaoEra);
        
        setCurrentStep(3);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nova Avaliação ERAS" />

            <div className="p-6">
                <AppPageHeader title="Nova Avaliação ERAS" description="Selecione o doente, o episódio e registe a avaliação ERAS." />

                <div className="mx-auto max-w-6xl space-y-8">
                    <AppWizard steps={steps} currentStep={currentStep} />

                    {currentStep === 0 && (
                        <StepDoente
                            doentes={doentes}
                            filters={filters}
                            selectedDoente={doente}
                            onSelect={selectDoente}
                            onBack={() => {}}
                            onContinue={goToEpisodio}
                            url="/avaliacao-eras/create"
                        />
                    )}

                    {currentStep === 1 && doente && (
                        <StepEpisodio
                            doente={doente}
                            episodios={episodios}
                            profissionais={users}
                            selectedEpisodio={episodio}
                            onSelect={setEpisodio}
                            onBack={backToDoente}
                            onContinue={goToTratamento}
                            url="/avaliacao-eras/create"
                        />
                    )}

                    {currentStep === 2 && doente && episodio && (
                        <StepAvaliacaoEras 
                        avaliacaoEras={avaliacaoEras} 
                        poloOptions={poloOptions}
                        doente={doente} 
                        episodio={episodio} 
                        onBack={backToEpisodio} 
                        onSuccess={finishAvaliacaoEra} 
                        onContinue={goToTratamento}
                        url="/avaliacao-eras/create"
                        />
                    )}

                    {currentStep === 3 && doente && episodio && avaliacaoEra && <StepConfirmation doente={doente} episodio={episodio} />}
                </div>
            </div>
        </AppLayout>
    );
}
