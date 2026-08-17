<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class CasoEquipaPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'caso-equipa.view',
            'caso-equipa.create',
            'caso-equipa.update',
            'caso-equipa.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }
    }
}