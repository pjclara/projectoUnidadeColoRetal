<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class CDTPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'c-d-t.view',
            'c-d-t.create',
            'c-d-t.update',
            'c-d-t.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

                // assign the permissions to a role (e.g., 'admin')
        $adminRole = \Spatie\Permission\Models\Role::findByName('admin');
        $adminRole->givePermissionTo($permissions);
    }
}