import type { ComponentType } from 'react';
import {
    Activity,
    Archive,
    BarChart3,
    CalendarDays,
    ClipboardCheck,
    ClipboardList,
    FileClock,
    FileInput,
    FileText,
    HeartPulse,
    LayoutDashboard,
    ShieldCheck,
    Stethoscope,
    UserCog,
    Users,
} from 'lucide-react';

export interface NavItem {
    title: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
    permission?: string;
}

export interface NavSection {
    title: string;
    items: NavItem[];
}

export const navigation: NavSection[] = [
    {
        title: '',
        items: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutDashboard,
            },
        ],
    },

    {
        title: 'Clínica',
        items: [
            {
                title: 'Doentes',
                href: '/doentes',
                icon: Users,
                permission: 'doentes.view',
            },
            {
                title: 'Episódios',
                href: '/episodios',
                icon: FileText,
                permission: 'episodios.view',
            },
            {
                title: 'CDT',
                href: '/cdt',
                icon: ClipboardCheck,
                permission: 'cdt.view',
            },
            {
                title: 'Tratamentos',
                href: '/tratamentos',
                icon: Activity,
                permission: 'tratamentos.view',
            },
            {
                title: 'Cirurgias',
                href: '/cirurgias',
                icon: Stethoscope,
                permission: 'cirurgias.view',
            },
            {
                title: 'Seguimento',
                href: '/seguimentos',
                icon: HeartPulse,
                permission: 'seguimentos.view',
            },
        ],
    },

    {
        title: 'Planeamento',
        items: [
            {
                title: 'Planeamento operatório',
                href: '/planeamento',
                icon: CalendarDays,
                permission: 'planeamento.view',
            },
            {
                title: 'Casos',
                href: '/casos',
                icon: ClipboardList,
                permission: 'casos.view',
            },
            {
                title: 'Salas',
                href: '/salas',
                icon: Archive,
                permission: 'salas.view',
            },
            {
                title: 'Equipa',
                href: '/equipa',
                icon: Users,
                permission: 'equipa.view',
            },
        ],
    },

    {
        title: 'Qualidade',
        items: [
            {
                title: 'Indicadores',
                href: '/indicadores',
                icon: BarChart3,
                permission: 'indicadores.view',
            },
            {
                title: 'Auditorias',
                href: '/auditorias',
                icon: ShieldCheck,
                permission: 'auditorias.view',
            },
        ],
    },

    {
        title: 'Administração',
        items: [
            {
                title: 'Utilizadores',
                href: '/admin/users',
                icon: UserCog,
                permission: 'users.view',
            },
            {
                title: 'Importações',
                href: '/importacoes',
                icon: FileInput,
                permission: 'importacoes.view',
            },
        ],
    },

    {
        title: 'Sistema',
        items: [
            {
                title: 'Auditoria',
                href: '/admin/auditoria',
                icon: FileClock,
                permission: 'auditoria.view',
            },
        ],
    },
];