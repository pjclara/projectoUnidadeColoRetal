import { Head, router } from '@inertiajs/react';
import type { Doente, DoenteFilters, Episodio, Pagination, Sala, Slot, User } from '../../types/types';

import { AppPageHeader } from '@/components/app/app-page-header';
import { AppWizard, type AppWizardStep } from '@/components/app/app-wizard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import StepSala from '../Salas/StepSala';
import { StepDoente } from '../Tratamentos/Wizard/StepDoente';
import { StepEpisodio } from '../Tratamentos/Wizard/StepEpisodio';
import { StepCasoPlaneado } from './StepCasoPlaneado';
import StepSlot from '../Slots/StepSLot';

type CasoPlaneadoItem = {
    id: number;
    slot_id: number;
    episodio_id: number;
    ordem: number;
    procedimento_previsto: string;
    duracao_prevista_min: number;
    anestesia_apto: boolean;
    cama_destino: string;
    internamento_em?: string | null;
    cirurgiao_id: number;
    observacoes: string;
    created_at?: string | null;
    updated_at?: string | null;
};

type FormData = {
    id: number;
    slot_id: number;
    episodio_id: number;
    ordem: number;
    procedimento_previsto: string;
    duracao_prevista_min: number;
    anestesia_apto: boolean;
    cama_destino: string;
    internamento_em?: string | null;
    cirurgiao_id: number;
    observacoes: string;
};

type Props = {
    doentes: Pagination<Doente>;
    selectedDoente: Doente | null;
    episodios: Pagination<Episodio> | null;
    slots: { id: number; nome_slot: string }[];
    poloOptions: { id: number; nome_polo: string }[];
    users: User[];
    salas: Pagination<Sala> | Sala[];
    filters: DoenteFilters;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'CasoPlaneados', href: '/caso-planeados' },
    { title: 'Novo CasoPlaneado', href: '/caso-planeados/create' },
];

const steps: AppWizardStep[] = [
    { id: 'doente', title: 'Doente', description: 'Procurar ou criar' },
    { id: 'episodio', title: 'Episódio', description: 'Selecionar ou criar' },
    { id: 'sala', title: 'Sala', description: 'Selecionar ou criar' },
    { id: 'slot', title: 'Slot', description: 'Selecionar ou criar' },
    { id: 'caso-planeado', title: 'Caso Planeado', description: 'Registo clínico' },
    { id: 'confirmacao', title: 'Confirmação', description: 'Concluído' },
];

export default function CreateCasoPlaneadoWizard({ doentes, selectedDoente: initialDoente, episodios, slots, users, filters, salas, poloOptions }: Props) {
    const [currentStep, setCurrentStep] = useState(initialDoente ? 1 : 0);
    const [doente, setDoente] = useState<Doente | null>(initialDoente);
    const [episodio, setEpisodio] = useState<Episodio | null>(null);
    const [sala, setSala] = useState<Sala | null>(null);
    const [slot, setSlot] = useState<Slot | null>(null);
    const [casoPlaneado, setCasoPlaneado] = useState<CasoPlaneadoItem | null>(null);

    const selectDoente = (selected: Doente) => {
        setDoente(selected);
        setEpisodio(null);

        router.get('/caso-planeados/create', { doente_id: selected.id }, { preserveState: true, preserveScroll: true, replace: true });
    };

    const goToEpisodio = () => setCurrentStep(1);

    const backToDoente = () => {
        setEpisodio(null);
        setCurrentStep(0);
    };

    const goToSala = () => setCurrentStep(2);

    const backToEpisodio = () => setCurrentStep(1);

    const goToCasoPlaneado = () => setCurrentStep(4);
    const finishCasoPlaneado = () => {
        setCurrentStep(5);
    };
    function backToSala(): void {
        setSlot(null);
        setCurrentStep(2);
    }

    function goToSlot(): void {
        setSlot(null);
        setCurrentStep(3);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Caso Planeado" />

            <div className="p-6">
                <AppPageHeader title="Novo Caso Planeado" description="Selecione o doente, o episódio e registe a discussão de caso." />

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
                            url="/caso-planeados/create"
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
                            onContinue={goToSala}
                            url="/caso-planeados/create"
                        />
                    )}
                    {currentStep === 2 && doente && episodio && (
                        <StepSala
                            doente={doente}
                            episodio={episodio}
                            poloOptions={poloOptions}
                            salas={salas}
                            selectedSala={sala}
                            onSelect={setSala}
                            onBack={backToEpisodio}
                            onContinue={goToSlot}
                        />
                    )}

                    {currentStep === 3 && doente && episodio && sala && (
                        <StepSlot
                            doente={doente}
                            episodio={episodio}
                            sala={sala}
                            slots={slots}
                            selectedSlot={slot}
                            onSelect={setSlot}
                            onBack={backToSala}
                            onContinue={goToCasoPlaneado}
                        />
                    )}

                    {currentStep === 4 && doente && (
                        <StepCasoPlaneado
                            doente={doente}
                            episodio={episodio}
                            slots={slots}
                            users={users}
                            casosPlaneados={[] as unknown as Pagination<never>}
                            onBack={backToEpisodio}
                            onSuccess={finishCasoPlaneado}
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
