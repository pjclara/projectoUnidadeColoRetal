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

export type Profissional = {
    id: number;
    name: string;
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
