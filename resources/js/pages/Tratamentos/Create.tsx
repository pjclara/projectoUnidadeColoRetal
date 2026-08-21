import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import type { Doente, Episodio, Pagination, Profissional, Tratamento, DoenteFilters } from '../../types/types';

import { AppPageHeader } from '@/components/app/app-page-header';
import { AppWizard, type AppWizardStep } from '@/components/app/app-wizard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { StepConfirmation } from './Wizard/StepConfirmation';
import { StepDoente } from './Wizard/StepDoente';
import { StepEpisodio } from './Wizard/StepEpisodio';
import { StepTratamento } from './Wizard/StepTratamento';

type Props = {
    doentes: Pagination<Doente>;
    selectedDoente: Doente | null;
    episodios: Pagination<Episodio> | null;
    users: Profissional[];
    filters:DoenteFilters
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tratamentos', href: '/tratamentos' },
    { title: 'Novo Tratamento', href: '/tratamentos/create' },
];

const steps: AppWizardStep[] = [
    { id: 'doente', title: 'Doente', description: 'Procurar ou criar' },
    { id: 'episodio', title: 'Episódio', description: 'Selecionar ou criar' },
    { id: 'tratamento', title: 'Tratamento', description: 'Registo clínico' },
    { id: 'confirmacao', title: 'Confirmação', description: 'Concluído' },
];

export default function CreateTratamentoWizard({ doentes, selectedDoente: initialDoente, episodios, users, filters }: Props) {
    const [currentStep, setCurrentStep] = useState(initialDoente ? 1 : 0);
    const [doente, setDoente] = useState<Doente | null>(initialDoente);
    const [episodio, setEpisodio] = useState<Episodio | null>(null);
    const [tratamento, setTratamento] = useState<Tratamento | null>(null);

    const selectDoente = (selected: Doente) => {
        setDoente(selected);
        setEpisodio(null);

        router.get('/tratamentos/create', { doente_id: selected.id }, { preserveState: true, preserveScroll: true, replace: true });
    };

    const goToEpisodio = () => setCurrentStep(1);

    const backToDoente = () => {
        setEpisodio(null);
        setCurrentStep(0);
    };

    const goToTratamento = () => setCurrentStep(2);

    const backToEpisodio = () => setCurrentStep(1);

    const finishTratamento = (createdTratamento: Tratamento) => {
        setTratamento(createdTratamento);
        setCurrentStep(3);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Tratamento" />

            <div className="p-6">
                <AppPageHeader title="Novo Tratamento" description="Selecione o doente, o episódio e registe a discussão de caso." />

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
                        />
                    )}

                    {currentStep === 2 && doente && episodio && (
                        <StepTratamento doente={doente} episodio={episodio} onBack={backToEpisodio} onSuccess={finishTratamento} />
                    )}

                    {currentStep === 3 && doente && episodio && tratamento && (
                        <StepConfirmation doente={doente} episodio={episodio} tratamento={tratamento} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
