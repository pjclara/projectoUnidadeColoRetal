<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class AtividadeDiariaPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'atividade-diarium.view',
            'atividade-diarium.create',
            'atividade-diarium.update',
            'atividade-diarium.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        $adminRole = \Spatie\Permission\Models\Role::findByName('admin');
        $adminRole->givePermissionTo($permissions);
    }
}