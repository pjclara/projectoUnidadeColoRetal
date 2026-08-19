<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class CasoPlaneadoPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'caso-planeado.view',
            'caso-planeado.create',
            'caso-planeado.update',
            'caso-planeado.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

                // assign the permissions to a role (e.g., 'admin')
        $adminRole = \Spatie\Permission\Models\Role::findByName('admin');
        $adminRole->givePermissionTo($permissions);
    }
}