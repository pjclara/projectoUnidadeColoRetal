import type { Doente, Episodio } from '@/types/types';
import { Button } from '@headlessui/react';
type ShowEpisodioProps = {
    doente?: Doente;
    episodio?: Episodio;
};

export default function ShowEpisodio({ doente, episodio }: ShowEpisodioProps) {
    const episodioSelecionado = episodio;

    return (
        <div style={{ maxWidth: 700, margin: '24px auto', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: 16 }}>Doente</h2>
            <div
                style={{
                    border: '1px solid #d9d9d9',
                    borderRadius: 8,
                    padding: 16,
                    background: '#f9f9f9',
                    marginBottom: 24,
                }}
            >
                <p style={{ margin: '0 0 8px' }}>
                    <strong>Nome:</strong> {doente?.nome}
                </p>
                <p style={{ margin: '0 0 8px' }}>
                    <strong>Número de utente:</strong> {doente?.pu ?? 'N/A'}
                </p>
                <p style={{ margin: 0 }}>
                    <strong>Idade:</strong> {doente?.data_nascimento ?? 'N/A'} anos
                </p>
                <p style={{ margin: '0 0 8px' }}>
                    <Button >
                        Editar Doente
                    </Button>
                </p>
            </div>

            <h2 style={{ marginBottom: 16 }}>Episódio selecionado</h2>
            {episodioSelecionado ? (
                <div
                    style={{
                        border: '1px solid #d9d9d9',
                        borderRadius: 8,
                        padding: 16,
                        background: '#fff',
                    }}
                >
                    <p style={{ margin: '0 0 8px' }}>
                        <strong>Título:</strong> {episodio?.tipo}
                    </p>
                    <p style={{ margin: '0 0 8px' }}>
                        <strong>Diagnostico:</strong> {episodio?.diagnostico}
                    </p>
                    <p style={{ margin: '0 0 8px' }}>
                        <strong>Estado:</strong> {episodio?.estado ?? 'N/A'}
                    </p>
                    <p style={{ margin: 0 }}>
                        <strong>Data do diagnostico:</strong> {episodio?.data_diagnostico ?? 'Sem data_diagnostico disponível.'}
                    </p>
                    <p style={{ margin: '0 0 8px' }}>
                        <Button type="button">
                            Editar Episódio
                        </Button>
                    </p>
                </div>
            ) : (
                <p>Nenhum episódio selecionado.</p>
            )}
        </div>
    );
}
