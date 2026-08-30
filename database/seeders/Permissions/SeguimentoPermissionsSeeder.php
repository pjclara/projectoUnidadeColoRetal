<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class SeguimentoPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'seguimento.view',
            'seguimento.create',
            'seguimento.update',
            'seguimento.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        $adminRole = \Spatie\Permission\Models\Role::findByName('admin');
        $adminRole->givePermissionTo($permissions);
    }
}