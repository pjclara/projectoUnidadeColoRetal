import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import type { CasoPlaneado, Cirurgia, Doente, DoenteFilters, Episodio, Pagination, User } from '../../types/types';

import { AppEntitySummary } from '@/components/app/app-entity-summary';
import { AppPageHeader } from '@/components/app/app-page-header';
import { AppWizard, type AppWizardStep } from '@/components/app/app-wizard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { StepDoente } from '../Tratamentos/Wizard/StepDoente';
import { StepEpisodio } from '../Tratamentos/Wizard/StepEpisodio';
import StepCirurgia from './StepCirurgia';

type Props = {
    doentes: Pagination<Doente>;
    selectedDoente: Doente | null;
    episodios: Pagination<Episodio> | null;
    casosPlaneados: CasoPlaneado[];
    filters: DoenteFilters;
    users: User[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Cirurgias', href: '/cirurgias' },
    { title: 'Nova Cirurgia', href: '/cirurgias/create' },
];

const steps: AppWizardStep[] = [
    { id: 'doente', title: 'Doente', description: 'Procurar ou criar' },
    { id: 'episodio', title: 'Episódio', description: 'Selecionar ou criar' },
    { id: 'cirurgia', title: 'Cirurgia', description: 'Registo clínico' },
    { id: 'confirmacao', title: 'Confirmação', description: 'Concluído' },
];

export default function CreateCirurgiaWizard({
    doentes,
    selectedDoente: initialDoente,
    episodios,
    casosPlaneados,
    users,
    filters,
}: Props) {
    const [currentStep, setCurrentStep] = useState(initialDoente ? 1 : 0);
    const [doente, setDoente] = useState<Doente | null>(initialDoente);
    const [episodio, setEpisodio] = useState<Episodio | null>(null);
    const [cirurgia, setCirurgia] = useState<Cirurgia | null>(null);

    const selectDoente = (selected: Doente) => {
        setDoente(selected);
        setEpisodio(null);

        router.get('/cirurgias/create', { doente_id: selected.id }, { preserveState: true, preserveScroll: true, replace: true });
    };

    const goToEpisodio = () => setCurrentStep(1);

    const backToDoente = () => {
        setEpisodio(null);
        setCurrentStep(0);
    };

    const goToCirurgia = () => setCurrentStep(2);

    const backToEpisodio = () => setCurrentStep(1);

    const finishCirurgia = (createdCirurgia: Cirurgia) => {
        setCirurgia(createdCirurgia);

        setCurrentStep(3);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nova Cirurgia" />

            <div className="p-6">
                <AppPageHeader title="Nova Cirurgia" description="Selecione o doente, o episódio e registe a cirurgia." />

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
                            url="/cirurgias/create"
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
                            onContinue={goToCirurgia}
                            url="/cirurgias/create"
                        />
                    )}

                    {currentStep === 2 && doente && episodio && (
                        <StepCirurgia
                            doente={doente}
                            episodio={episodio}
                            casosPlaneados={casosPlaneados}
                            onBack={backToEpisodio}
                            onSuccess={finishCirurgia}
                        />
                    )}
                    {currentStep === 3 && doente && episodio && cirurgia && (
                        <div className="space-y-6">
                            <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center dark:border-green-900 dark:bg-green-950">
                                <p className="text-lg font-semibold text-green-700 dark:text-green-400">Cirurgia criada com sucesso.</p>
                            </div>
                            <AppEntitySummary
                                title="Cirurgia"
                                fields={[
                                    { label: 'Procedimento', value: cirurgia.procedimento },
                                    { label: 'Abordagem', value: cirurgia.abordagem },
                                ]}
                            />
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
