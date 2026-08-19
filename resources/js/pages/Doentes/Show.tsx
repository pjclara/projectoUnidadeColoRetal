import { AppPageHeader } from '@/components/app/app-page-header';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

type Doente = {
    id: number;
    nome: string;
    pu: string;
    data_nascimento: string | null;
    sexo: string | null;
    created_at?: string | null;
    updated_at?: string | null;
};

type Props = {
    doente: Doente;
};

const sexoLabels: Record<string, string> = {
    M: 'Masculino',
    F: 'Feminino',
    O: 'Outro',
};

export default function Show({ doente }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Doentes',
            href: '/doentes',
        },
        {
            title: doente.nome,
            href: `/doentes/${doente.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Doente - ${doente.nome}`} />

            <div className="space-y-6 p-6">
                <AppPageHeader
                    title={doente.nome}
                    description="Ficha do doente"
                    action={
                        <div className="flex gap-2">
                            <Link href="/doentes">
                                <Button variant="outline">
                                    Voltar
                                </Button>
                            </Link>

                            <Link href={`/doentes/${doente.id}/edit`}>
                                <Button>
                                    Editar
                                </Button>
                            </Link>
                        </div>
                    }
                />

                {/* Dados de identificação */}
                <section className="rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold">
                            Dados de identificação
                        </h2>

                        <p className="text-sm text-neutral-500">
                            Informação principal do doente
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <InfoField
                            label="Nome"
                            value={doente.nome}
                        />

                        <InfoField
                            label="PU"
                            value={doente.pu}
                        />

                        <InfoField
                            label="Data de nascimento"
                            value={doente.data_nascimento ?? '—'}
                        />

                        <InfoField
                            label="Sexo"
                            value={
                                doente.sexo
                                    ? sexoLabels[doente.sexo] ?? doente.sexo
                                    : '—'
                            }
                        />
                    </div>
                </section>

                {/* Consultas */}
                <section className="rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Consultas
                            </h2>

                            <p className="text-sm text-neutral-500">
                                Histórico de consultas do doente
                            </p>
                        </div>

                        <Button disabled>
                            Nova consulta
                        </Button>
                    </div>

                    <div className="mt-6 rounded-lg border border-dashed p-8 text-center text-sm text-neutral-500 dark:border-neutral-700">
                        Ainda não existem consultas.
                    </div>
                </section>

                {/* Exames */}
                <section className="rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Exames
                            </h2>

                            <p className="text-sm text-neutral-500">
                                Exames realizados pelo doente
                            </p>
                        </div>

                        <Button disabled>
                            Novo exame
                        </Button>
                    </div>

                    <div className="mt-6 rounded-lg border border-dashed p-8 text-center text-sm text-neutral-500 dark:border-neutral-700">
                        Ainda não existem exames.
                    </div>
                </section>

                {/* Documentos */}
                <section className="rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Documentos
                            </h2>

                            <p className="text-sm text-neutral-500">
                                Documentos associados ao doente
                            </p>
                        </div>

                        <Button disabled>
                            Adicionar documento
                        </Button>
                    </div>

                    <div className="mt-6 rounded-lg border border-dashed p-8 text-center text-sm text-neutral-500 dark:border-neutral-700">
                        Ainda não existem documentos.
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}

function InfoField({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <dt className="text-sm font-medium text-neutral-500">
                {label}
            </dt>

            <dd className="mt-1 text-sm font-medium">
                {value}
            </dd>
        </div>
    );
}
