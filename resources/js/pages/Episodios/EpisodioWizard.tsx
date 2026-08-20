import { useState } from 'react';
import { AppWizard } from '@/components/app/app-wizard';
import { DoenteStep } from './steps/DoenteStep';
import { EpisodiosStep } from './steps/EpisodiosStep';
import { EpisodioStep } from './steps/EpisodioStep';
import type { Doente, Episodio } from './types';

type Props = {
    doentes?: Doente[];
    episodios?: Episodio[];
};

export function EpisodioWizard({
    doentes = [],
    episodios = [],
}: Props) {
    const [currentStep, setCurrentStep] = useState(0);

    const [selectedDoente, setSelectedDoente] =
        useState<Doente | null>(null);

    const [selectedEpisodio, setSelectedEpisodio] =
        useState<Episodio | null>(null);

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
            title: 'Episódio',
            description: 'Dados',
        },
    ];

    const selectDoente = (doente: Doente) => {
        setSelectedDoente(doente);
        setSelectedEpisodio(null);
        setCurrentStep(1);
    };

    const createDoente = (doente: Doente) => {
        setSelectedDoente(doente);
        setSelectedEpisodio(null);
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
        setCurrentStep(0);
    };

    const backToEpisodios = () => {
        setSelectedEpisodio(null);
        setCurrentStep(1);
    };

    return (
        <div className="space-y-8">
            <AppWizard
                steps={steps}
                currentStep={currentStep}
            >
                {currentStep === 0 && (
                    <DoenteStep
                        doentes={doentes}
                        selectedDoente={selectedDoente}
                        onSelect={selectDoente}
                        onCreate={createDoente}
                    />
                )}

                {currentStep === 1 && selectedDoente && (
                    <EpisodiosStep
                        doente={selectedDoente}
                        episodios={episodios}
                        onBack={backToDoente}
                        onCreate={createEpisodio}
                        onEdit={editEpisodio}
                    />
                )}

                {currentStep === 2 && selectedDoente && (
                    <EpisodioStep
                        doente={selectedDoente}
                        episodio={selectedEpisodio}
                        onBack={backToEpisodios}
                        onSuccess={backToEpisodios}
                    />
                )}
            </AppWizard>
        </div>
    );
}