<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class SlotPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'slot.view',
            'slot.create',
            'slot.update',
            'slot.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        $adminRole = \Spatie\Permission\Models\Role::findByName('admin');
        $adminRole->givePermissionTo($permissions);
    }
}