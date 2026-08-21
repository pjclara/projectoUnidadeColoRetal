<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class SalaPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'sala.view',
            'sala.create',
            'sala.update',
            'sala.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        // assign the permissions to a role (e.g., 'admin')
        $adminRole = \Spatie\Permission\Models\Role::findByName('admin');
        $adminRole->givePermissionTo($permissions);
    }
}
