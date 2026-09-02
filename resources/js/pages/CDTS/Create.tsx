import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

import { AppPageHeader } from '@/components/app/app-page-header';
import { AppWizard, type AppWizardStep } from '@/components/app/app-wizard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import type { CDT, CDTFilters, Doente, Episodio, Pagination, User } from '@/types/types';
import { StepDoente } from '../Doentes/StepDoente';
import { StepEpisodio } from '../Episodios/StepEpisodio';
import { StepConfirmation } from '../Tratamentos/Wizard/StepConfirmation';
import { StepCDT } from './Wizard/StepCDT';

type Props = {
    doentes: Pagination<Doente>;
    selectedDoente: Doente | null;
    episodios: Pagination<Episodio> | null;
    users: User[];
    filters: CDTFilters;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'CDTs', href: '/cdts' },
    { title: 'Nova CDT', href: '/cdts/create' },
];

const steps: AppWizardStep[] = [
    { id: 'doente', title: 'Doente', description: 'Procurar ou criar' },
    { id: 'episodio', title: 'Episódio', description: 'Selecionar ou criar' },
    { id: 'cdt', title: 'CDT', description: 'Registo clínico' },
    { id: 'confirmacao', title: 'Confirmação', description: 'Concluído' },
];

export default function CreateCDTWizard({ doentes, selectedDoente: initialDoente, episodios, users, filters }: Props) {
    const [currentStep, setCurrentStep] = useState(initialDoente ? 1 : 0);
    const [doente, setDoente] = useState<Doente | null>(initialDoente);
    const [episodio, setEpisodio] = useState<Episodio | null>(null);
    const [cdt, setCdt] = useState<CDT | null>(null);
    const messagem = "Discussão de caso registada com sucesso.";

    const selectDoente = (selected: Doente) => {
        setDoente(selected);
        setEpisodio(null);
        setCurrentStep(1);

        router.get('/cdts/create', { doente_id: selected.id }, { preserveState: true, preserveScroll: true, replace: true });
    };

    const goToEpisodio = () => setCurrentStep(1);

    const backToDoente = () => {
        setEpisodio(null);
        setCurrentStep(0);
    };

    const goToCDT = () => setCurrentStep(2);

    const backToEpisodio = () => setCurrentStep(1);

    const finishCDT = (createdCdt: CDT) => {
        setCdt(createdCdt);
        setCurrentStep(3);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nova CDT" />

            <div className="p-6">
                <AppPageHeader title="Nova CDT" description="Selecione o doente, o episódio e registe a discussão de caso." />

                <div className="mx-auto max-w-6xl space-y-8">
                    <AppWizard steps={steps} currentStep={currentStep} />

                    {currentStep === 0 && <StepDoente doentes={doentes} selectedDoente={doente} onSelect={selectDoente} onCreate={selectDoente} />}

                    {currentStep === 1 && doente && (
                        <StepEpisodio
                            doente={doente}
                            episodios={episodios}
                            users={users}
                            setSelectedEpisodio={setEpisodio}
                            onBack={backToDoente}
                            onCreate={() => {}}
                            onEdit={() => {}}
                            continue={goToCDT}
                        />
                    )}

                    {currentStep === 2 && doente && episodio && (
                        <StepCDT doente={doente} episodio={episodio} onBack={backToEpisodio} onSuccess={(createdCdt) => finishCDT(createdCdt)} onContinue={finishCDT} />
                    )}

                    {currentStep === 3 && doente && episodio && cdt && (
                        <StepConfirmation
                            doente={doente}
                            episodio={episodio}
                            successMessage={messagem}
                            backLabel="Voltar às CDT"
                            backUrl="/cdts"
                            viewLabel="Ver CDT"
                            sections={[
                                {
                                    title: 'CDT',
                                    fields: [
                                        { label: 'Data do pedido', value: cdt.data_pedido },
                                        { label: 'Data da discussão', value: cdt.data_discussao },
                                        { label: 'Estádio clínico', value: cdt.estadio_clinico },
                                    ],
                                },
                            ]}
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
