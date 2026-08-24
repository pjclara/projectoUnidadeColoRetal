<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class CirurgiaPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'cirurgium.view',
            'cirurgium.create',
            'cirurgium.update',
            'cirurgium.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        $adminRole = \Spatie\Permission\Models\Role::findByName('admin');
        $adminRole->givePermissionTo($permissions);
    }
}