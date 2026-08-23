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

export type Slot = {
    id: number;
    nome_slot: string;
    episodio_id?: number | null;
    ordem?: number | null;
    procedimento_previsto?: string | null;
    duracao_prevista_min?: number | null;
    anestesia_apto?: boolean | null;
    cama_destino?: string | null;
    internamento_em?: string | null;
    cirurgiao_id?: number | null;
    observacoes?: string | null;
};

export type Episodio = {
    id: number;
    doente_id: number;
    tipo: string;
    diagnostico?: string | null;
    cid10?: string | null;
    data_diagnostico?: string | null;
    estado: string;
};

export type CDT = {
    id: number;
    episodio_id: number;
    data_pedido?: string | null;
    data_discussao?: string | null;
    decisao?: string | null;
    estadio_clinico?: string | null;
};

export type User = {
    id: number;
    name: string;
    email: string;
};

export type CDTFilters = {
    search: string;
    pu: string;
    nome: string;
    data_nascimento: string;
};

export type Tratamento = {
    id: number;
    doente_id: number;
    episodio_id: number;
    data_pedido?: string | null;
    data_discussao?: string | null;
    decisao?: string | null;
    estadio_clinico?: string | null;
};

export type DoenteFilters = {
    search: string;
    pu: string; 
    nome: string;
    data_nascimento: string;
};

export type CasoPlaneado = {
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
