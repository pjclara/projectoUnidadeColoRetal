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
    }
}