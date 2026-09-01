import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import type { SharedData, User } from '@/types';

type WelcomePageProps = Omit<SharedData, 'auth'> & Record<string, unknown> & {
    auth: { user: User | null };
};

export default function Welcome() {
    const { auth } = usePage<WelcomePageProps>().props;

    return (

            <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a]">
                {/* Header */}
                <Head title="Welcome" />
                <header className="mb-10 flex w-full max-w-4xl justify-end">
                    <nav className="flex items-center justify-end gap-4">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>


                            </>
                        )}
                    </nav>
                </header>

                {/* Main */}
                <main className="w-full max-w-4xl rounded-xl border border-neutral-200 bg-white p-10 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                    <h1 className="mb-4 text-2xl font-semibold">Unidade Colorectal</h1>

                    <p className="mb-6 leading-relaxed text-neutral-600 dark:text-neutral-400">
                        Sistema de gestão clínica para episódios, cirurgias, planeamento operatório, seguimento e indicadores de qualidade.
                    </p>


                </main>
            </div>
    );
}
