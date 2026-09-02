import { AppPageHeader } from '@/components/app/app-page-header';
import { AppWizard } from '@/components/app/app-wizard';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import type { Doente, Episodio, Pagination, User } from '../../types/types';
import { StepDoente } from '../Doentes/StepDoente';
import { StepConfirmation } from '../Tratamentos/Wizard/StepConfirmation';
import CreateOrUpdateEpisodio from './CreateOrUpdateEpisodio';
import { StepEpisodio } from './StepEpisodio';

type Props = {
    doentes: Pagination<Doente>;
    selectedDoente?: Doente | null;
    episodios?: Pagination<Episodio> | null;
    users?: User[];
};

export default function CreateEpisodioWizard({ doentes, selectedDoente: initialDoente = null, episodios = null, users = [] }: Props) {
    const [currentStep, setCurrentStep] = useState(initialDoente ? 1 : 0);
    const [selectedDoente, setSelectedDoente] = useState<Doente | null>(initialDoente);
    const [selectedEpisodio, setSelectedEpisodio] = useState<Episodio | null>(null);

    const steps = [
        {
            id: 'doente',
            title: 'Doente',
            description: 'Procurar ou criar',
        },
        {
            id: 'episodios',
            title: 'Episódios',
            description: 'Histórico',
        },
        {
            id: 'episodio',
            title: 'Dados do Episódio',
            description: 'Editar o episódio',
        },
    ];

    const selectDoente = (doente: Doente) => {
        setSelectedDoente(doente);
        setSelectedEpisodio(null);
        setCurrentStep(1);

        router.get('/episodios/create', { doente_id: doente.id }, { preserveState: true, preserveScroll: true, replace: true });
    };

    const createDoente = (doente: Doente) => {
        router.get('/episodios/create', { doente_id: doente.id }, { preserveState: true, preserveScroll: true, replace: true });
        setSelectedDoente(doente);
        setCurrentStep(1);
    };

    const createEpisodio = () => {
        setSelectedEpisodio(null);
        setCurrentStep(2);
    };

    const editEpisodio = (episodio: Episodio) => {
        setSelectedEpisodio(episodio);
        setCurrentStep(2);
    };

    const backToDoente = () => {
        setSelectedEpisodio(null);
        setCurrentStep(0);
    };

    const backToEpisodios = () => {
        setSelectedEpisodio(null);
        setCurrentStep(1);
    };

    const goToNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Home', href: '/' },
        { title: 'Episódios', href: '/episodios' },
        { title: 'Criar', href: '/episodios/create' },
    ];

    console.log({ currentStep, selectedDoente, selectedEpisodio, users });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Episódios" />

            <div className="p-6">
                <AppPageHeader
                    title="Episódios"
                    description="Gestão e consulta de episódios clínicos"
                    action={
                        <Button type="button" size="sm" variant="outline" onClick={() => router.get('/episodios')}>
                            Voltar
                        </Button>
                    }
                />
                <div className="space-y-8">
                    <AppWizard steps={steps} currentStep={currentStep}>
                        {currentStep === 0 && (
                            <StepDoente doentes={doentes} selectedDoente={selectedDoente} onSelect={selectDoente} onCreate={createDoente} />
                        )}

                        {currentStep === 1 && selectedDoente && (
                            <StepEpisodio
                                doente={selectedDoente}
                                setSelectedEpisodio={setSelectedEpisodio}
                                episodios={episodios}
                                onBack={backToDoente}
                                onCreate={createEpisodio}
                                onEdit={editEpisodio}
                                continue={goToNextStep}
                                users={users}
                            />
                        )}

                        {currentStep === 2 &&
                            selectedDoente &&
                            (selectedEpisodio ? (
                                <StepConfirmation
                                    doente={selectedDoente}
                                    episodio={selectedEpisodio}
                                    successMessage="Dados do episódio selecionado!"
                                    backLabel="Voltar aos episódios"
                                    backUrl="/episodios"
                                    viewLabel="Ver episódio"
                                    sections={[
                                        {
                                            title: 'CDT',
                                            fields: [
                                                { label: 'Tipo', value: selectedEpisodio.tipo },
                                                { label: 'Diagnóstico', value: selectedEpisodio.diagnostico },
                                                { label: 'Estado', value: selectedEpisodio.estado },
                                            ],
                                        },
                                    ]}
                                />
                            ) : (
                                <CreateOrUpdateEpisodio
                                    doenteId={selectedDoente.id}
                                    profissionais={users}
                                    onClose={backToEpisodios}
                                    onCreated={(episodio) => {
                                        setSelectedEpisodio(episodio as Episodio);
                                        setCurrentStep(1);
                                    }}
                                />
                            ))}
                    </AppWizard>
                </div>
            </div>
        </AppLayout>
    );
}
