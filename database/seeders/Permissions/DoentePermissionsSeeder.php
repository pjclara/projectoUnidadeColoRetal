<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class DoentePermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'doente.view',
            'doente.create',
            'doente.update',
            'doente.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        // assign the permissions to a role (e.g., 'admin')
        $adminRole = \Spatie\Permission\Models\Role::findByName('admin');
        $adminRole->givePermissionTo($permissions);
    }
}