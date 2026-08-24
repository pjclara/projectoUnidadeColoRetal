<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class AvaliacaoErasPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'avaliacao-era.view',
            'avaliacao-era.create',
            'avaliacao-era.update',
            'avaliacao-era.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        $adminRole = \Spatie\Permission\Models\Role::findByName('admin');
        $adminRole->givePermissionTo($permissions);
    }
}