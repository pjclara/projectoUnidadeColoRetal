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
    polo: string;
    periodo: string;
    modalidade: string;
    data: string;
    hora_inicio: string;
    hora_fim_prevista: string;
    sala_id: number;
    estado: string;
    origem: string;
    observacoes?: string | null;
    nome_slot: string;
};

export type Episodio = {
    id: number;
    doente_id: number;
    tipo: string;
    diagnostico?: string | null;
    cid10?: string | null;
    data_diagnostico?: string | null;
    estado: string;
    pai_entrada?: string | null;
    pai_saida?: string | null;
    tratamentos?: Tratamento[];
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
    email?: string;
};

export type CasoEquipa = {
    user: number;
    funcao: string;
    caso_planeado_id: number;
};

export type CDTFilters = {
    search: string;
    pu: string;
    nome: string;
    data_nascimento: string;
};

export type Tratamento = {
    id: number;
    episodio_id: number;
    tipo: string;
    data_proposta?: string | null;
    data_inicio?: string | null;
    data_fim?: string | null;
    intencao?: string | null;
    observacoes?: string | null;
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

export type AvaliacaoEras = {
    id: number;
    episodio_id: number;
    data_consulta: string;
    aptidao: string;
    asa: string;
    polo_recomendado: string;
    mfr: string;
    dias_prehabilitacao: number;
    notas: string;
    fonte: string;
};

export type Cirurgia = {
    id: number;
    caso_planeado_id: number | null;
    procedimento?: string | null;
    abordagem?: string | null;
    urgencia?: boolean | null;
    reto?: boolean | null;
    terc_inferior_reto?: boolean | null;
    excisao_mesorrecto?: boolean | null;
    ressecao_curativa?: boolean | null;
    colostomia_definitiva?: boolean | null;
    anastomose?: boolean | null;
    eras_id?: number | null;
    observacoes?: string | null;
};

export type Sala = {
    id: number;
    nome_sala: string;
    polo: string;
    codigo: string;
    designacao: string;
    ativa: boolean;
};

export type Filters = {
    search: string;
    sexo: string;
};

export type Sexo = {
    id: number;
    nome: string;
};



