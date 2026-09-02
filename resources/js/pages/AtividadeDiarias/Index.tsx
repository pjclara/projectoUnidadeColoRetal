import { AppPageHeader } from '@/components/app/app-page-header';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Copy, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import CreateOrUpdateAtividadeDiaria from './CreateOrUpdateAtividadeDiaria';

type AtividadeDiariaItem = {
    id: number;
    user_id?: number | null;
    data?: string | null;
    polo?: string | null;
    periodo?: string | null;
    detalhe?: string | null;
    fonte?: string | null;
    tipo?: string | null;
    user?: string | null;
};

type Props = {
    atividadeDiarias: AtividadeDiariaItem[];
    viewMode: 'week' | 'month';
    selectedWeek: string;
    selectedMonth: string;
    poloOptions: Array<{ label: string; value: string }>;
    userOptions: User[];
    periodoOptions: Array<{ label: string; value: string }>;
    tipoOptions: Array<{ label: string; value: string }>;
};

const activityLabels: Record<string, string> = {
    residencia_hg: 'RESID HG',
    urgencia_ucci: 'URGÊNCIA / UCCI',
    visita_huc: 'Visita HUC',
    visita_hg: 'Visita HG',
    rdt_cdt: 'RDT',
    reuniao: 'Reuniões',
    ferias_ausencia: 'Férias / Ausências',
    consulta: 'Consulta',
    boc: 'BOC',
    uca: 'UCA',
    adicional: 'Adicional',
};

const weekdayLabels = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'];

export default function Index({ atividadeDiarias, viewMode, selectedWeek, selectedMonth, poloOptions, userOptions, periodoOptions, tipoOptions }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<AtividadeDiariaItem | null>(null);
    const [defaults, setDefaults] = useState<Partial<AtividadeDiariaItem>>({});

    const days = useMemo(() => {
        if (viewMode === 'month') {
            const [year, month] = selectedMonth.split('-').map(Number);
            const totalDays = new Date(year, month, 0).getDate();

            return Array.from({ length: totalDays }, (_, index) => {
                const day = index + 1;
                const data = `${selectedMonth}-${String(day).padStart(2, '0')}`;
                const dayOfWeek = new Date(year, month - 1, day).getDay();
                return { data, day, weekday: weekdayLabels[(dayOfWeek + 6) % 7] };
            });
        }

        const [year, month, day] = selectedWeek.split('-').map(Number);
        const startDate = new Date(year, month - 1, day);

        return Array.from({ length: 7 }, (_, index) => {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + index);
            const data = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            return { data, day: date.getDate(), weekday: weekdayLabels[index] };
        });
    }, [selectedMonth, selectedWeek, viewMode]);

    const activitiesByCell = useMemo(() => {
        return atividadeDiarias.reduce<Record<string, AtividadeDiariaItem[]>>((activities, activity) => {
            if (!activity.data || !activity.tipo) return activities;
            const key = `${activity.data}-${activity.tipo}`;
            activities[key] = [...(activities[key] ?? []), activity];
            return activities;
        }, {});
    }, [atividadeDiarias]);

    const openCreate = (newDefaults: Partial<AtividadeDiariaItem> = {}) => {
        setEditingItem(null);
        setDefaults(newDefaults);
        setIsOpen(true);
    };

    const openEdit = (item: AtividadeDiariaItem) => {
        setDefaults({});
        setEditingItem(item);
        setIsOpen(true);
    };

    const duplicateActivity = (activity: AtividadeDiariaItem) => {
        openCreate({
            user_id: activity.user_id,
            data: activity.data,
            polo: activity.polo,
            periodo: activity.periodo,
            detalhe: activity.detalhe,
            fonte: activity.fonte,
            tipo: activity.tipo,
        });
    };

    const navigate = (params: Record<string, string>) => router.get('/atividade-diarias', { view: viewMode, ...params }, { preserveState: true, replace: true });

    const changeWeek = (week: string) => navigate({ week });

    const changeMonth = (month: string) => navigate({ month });

    const changeView = (mode: 'week' | 'month') => router.get('/atividade-diarias', mode === 'week' ? { view: mode, week: selectedWeek } : { view: mode, month: selectedMonth }, { preserveState: true, replace: true });

    const moveWeek = (offset: number) => {
        const [year, month, day] = selectedWeek.split('-').map(Number);
        const targetDate = new Date(year, month - 1, day + offset * 7);
        changeWeek(`${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`);
    };

    const moveMonth = (offset: number) => {
        const [year, month] = selectedMonth.split('-').map(Number);
        const targetDate = new Date(year, month - 1 + offset, 1);
        changeMonth(`${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}`);
    };

    const breadcrumbs = [{ title: 'AtividadeDiarias', href: '/atividade-diarias' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="AtividadeDiarias" />

                <div className="space-y-6 p-6">
                    <AppPageHeader
                        title={`Programação ${viewMode === 'week' ? 'semanal' : 'mensal'} de atividade`}
                        description="Planeie e consulte a atividade da equipa por dia e área funcional."
                        action={<Button onClick={() => openCreate()}><Plus /> Nova atividade</Button>}
                    />

                    <section className="rounded-lg border border-border bg-card shadow-sm">
                        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="flex rounded-md border border-input p-1">
                                    <Button type="button" size="sm" variant={viewMode === 'week' ? 'secondary' : 'ghost'} onClick={() => changeView('week')}>Semanal</Button>
                                    <Button type="button" size="sm" variant={viewMode === 'month' ? 'secondary' : 'ghost'} onClick={() => changeView('month')}>Mensal</Button>
                                </div>
                                <Button type="button" variant="outline" size="icon" aria-label={viewMode === 'week' ? 'Semana anterior' : 'Mês anterior'} onClick={() => viewMode === 'week' ? moveWeek(-1) : moveMonth(-1)}><ChevronLeft /></Button>
                                {viewMode === 'week' ? (
                                    <input aria-label="Selecionar semana" type="date" value={selectedWeek} onChange={(event) => changeWeek(event.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm font-semibold" />
                                ) : (
                                    <input aria-label="Selecionar mês" type="month" value={selectedMonth} onChange={(event) => changeMonth(event.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm font-semibold" />
                                )}
                                <Button type="button" variant="outline" size="icon" aria-label={viewMode === 'week' ? 'Semana seguinte' : 'Mês seguinte'} onClick={() => viewMode === 'week' ? moveWeek(1) : moveMonth(1)}><ChevronRight /></Button>
                            </div>
                            <p className="text-sm text-muted-foreground">Clique numa célula para programar ou use o ícone para duplicar.</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1200px] border-collapse text-sm">
                                <thead className="bg-slate-700 text-left text-slate-50">
                                    <tr>
                                        <th className="w-12 border border-slate-800 px-2 py-3 text-center font-semibold">Dia</th>
                                        <th className="w-14 border border-slate-800 px-2 py-3 text-center font-semibold">Semana</th>
                                        {tipoOptions.map((type) => <th key={type.value} className="min-w-32 border border-slate-800 px-3 py-3 text-center font-semibold">{activityLabels[type.value] ?? type.label}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {days.map(({ data, day, weekday }) => (
                                        <tr key={data} className={weekday === 'sáb' || weekday === 'dom' ? 'bg-muted/100' : 'bg-background'}>
                                            <td className="border border-border px-2 py-1 text-center font-medium">{day}</td>
                                            <td className="border border-border px-2 py-1 text-center lowercase text-muted-foreground">{weekday}</td>
                                            {tipoOptions.map((type) => {
                                                const cellActivities = activitiesByCell[`${data}-${type.value}`] ?? [];
                                                return (
                                                    <td
                                                        key={type.value}
                                                        onClick={() => openCreate({ data, tipo: type.value })}
                                                        className="h-12 border border-border p-1 align-top hover:bg-primary/5"
                                                    >
                                                        <div className="space-y-1">
                                                            {cellActivities.map((activity) => (
                                                                <div
                                                                    key={activity.id}
                                                                    className="flex items-start gap-1 rounded bg-primary/10 px-1.5 py-1 text-xs leading-tight text-primary hover:bg-primary/20"
                                                                >
                                                                    <button type="button" onClick={(event) => { event.stopPropagation(); openEdit(activity); }} className="min-w-0 flex-1 text-left">
                                                                        <span className="font-semibold">{activity.user ?? 'Sem profissional'}</span>{activity.periodo ? ` · ${activity.periodo}` : ''}{activity.detalhe ? ` — ${activity.detalhe}` : ''}
                                                                    </button>
                                                                    <button type="button" onClick={(event) => { event.stopPropagation(); duplicateActivity(activity); }} className="shrink-0 rounded p-0.5 hover:bg-primary/20" aria-label="Duplicar atividade" title="Duplicar atividade"><Copy className="size-3" /></button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

            <CreateOrUpdateAtividadeDiaria
                open={isOpen}
                onClose={() => {
                    setEditingItem(null);
                    setIsOpen(false);
                }}
                atividade={editingItem}
                defaults={defaults}
                poloOptions={poloOptions}
                userOptions={[
                    ...userOptions.map((user) => ({
                        value: String(user.id),
                        label: user.name,
                    })),
                ]}
                periodoOptions={periodoOptions}
                tipoOptions={tipoOptions}
            />
        </AppLayout>
    );
}
