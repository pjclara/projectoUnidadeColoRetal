import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [{ title: 'Tratamentos', href: '/tratamentos' }, { title: 'Novo Tratamento', href: '/tratamentos/create' }];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tratamentos" />

            <div className="p-6">
               
            </div>
        </AppLayout>
    );
}