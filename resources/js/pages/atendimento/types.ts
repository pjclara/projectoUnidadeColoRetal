export type Doente = {
    id: number;
    nome: string;
    pu: string;
    data_nascimento: string | null;
    sexo: string | null;
};

export type Episodio = {
    id: number;
    tipo: string;
    servico?: string | null;
    iniciado_em: string;
    terminado_em?: string | null;
    motivo?: string | null;
};

export type AtendimentoWizardProps = {
    doentes?: Doente[];
    episodios?: Episodio[];
};