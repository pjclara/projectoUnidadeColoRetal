export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type Pagination<T> = {
    data: T[];
    links: PaginationLink[];
    from?: number | null;
    to?: number | null;
    total?: number | null;
};

export type Doente = {
    id: number;
    nome: string;
    pu: string;
    data_nascimento: string | null;
    sexo: string | null;
};

export type Episodio = {
    id: number;
    doente_id: number;

    doente?: Doente | null;

    tipo:
        | 'ONCOLOGICO'
        | 'BENIGNO'
        | 'DII'
        | 'FUNCIONAL'
        | 'OUTRO';

    diagnostico?: string | null;
    cid10?: string | null;

    data_diagnostico?: string | null;

    centro_referencia: boolean;

    pai_entrada?: string | null;
    pai_saida?: string | null;

    motivo_saida?: string | null;

    user_id?: number | null;

    estado: string;

    observacoes?: string | null;

    created_at?: string | null;
    updated_at?: string | null;

    user?: {
        id: number;
        name: string;
    } | null;
};

export type AtendimentoFilters = {
    search: string;
    pu: string;
    nome: string;
    data_nascimento: string;
};

export type FlashProps = {
    success?: string;
    created_doente?: Doente;
};
