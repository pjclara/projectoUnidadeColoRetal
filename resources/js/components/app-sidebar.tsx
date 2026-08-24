import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';

import {
    Activity,
    BarChart3,
    CalendarDays,
    ClipboardCheck,
    ClipboardList,
    FileText,
    Folder,
    HeartPulse,
    LayoutGrid,
    ShieldCheck,
    Stethoscope,
    UserCog,
    Users,
} from 'lucide-react';

import AppLogo from './app-logo';

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

const dashboardNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
];

/*
|--------------------------------------------------------------------------
| Clínica
|--------------------------------------------------------------------------
*/

const clinicaNavItems: NavItem[] = [
    {
        title: 'Doentes',
        url: '/doentes',
        icon: Users,
    },
    {
        title: 'Episódios',
        url: '/episodios',
        icon: FileText,
    },
    {
        title: 'CDT',
        url: '/cdts',
        icon: ClipboardCheck,
    },
    {
        title: 'Tratamentos',
        url: '/tratamentos',
        icon: Activity,
    },
    {
        title: 'Cirurgias',
        url: '/cirurgias',
        icon: Stethoscope,
    },
    {
        title: 'Seguimento',
        url: '/seguimentos',
        icon: HeartPulse,
    },
    {
        title: 'Avaliação ERAS',
        url: '/avaliacao-eras',
        icon: ClipboardList,
    }
];

/*
|--------------------------------------------------------------------------
| Planeamento
|--------------------------------------------------------------------------
*/

const planeamentoNavItems: NavItem[] = [
    {
        title: 'Planeamento operatório',
        url: '/caso-planeados',
        icon: CalendarDays,
    },
    {
        title: 'Salas',
        url: '/salas',
        icon: Folder,
    },
    {
        title: 'Slots',
        url: '/slots',
        icon: Folder,
    }
];

/*
|--------------------------------------------------------------------------
| Qualidade
|--------------------------------------------------------------------------
*/

const qualidadeNavItems: NavItem[] = [
    {
        title: 'Indicadores',
        url: '/indicadores',
        icon: BarChart3,
    },
    {
        title: 'Auditorias',
        url: '/auditorias',
        icon: ShieldCheck,
    },
];

/*
|--------------------------------------------------------------------------
| Administração
|--------------------------------------------------------------------------
*/

const administracaoNavItems: NavItem[] = [
    {
        title: 'Utilizadores',
        url: '/users',
        icon: Users,
    },
    {
        title: 'Roles & Permissões',
        url: '/access-control',
        icon: UserCog,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            {/* LOGO */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* MENU */}
            <SidebarContent>
                {/* Dashboard */}
                <NavMain title="Dashboard" items={dashboardNavItems} />

                {/* Clínica */}
                <NavMain title="Clínica" items={clinicaNavItems} />

                {/* Planeamento */}
                <NavMain title="Planeamento" items={planeamentoNavItems} />

                {/* Qualidade */}
                <NavMain title="Qualidade" items={qualidadeNavItems} />

                {/* Administração */}
                <NavMain title="Administração" items={administracaoNavItems} />
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />

                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
