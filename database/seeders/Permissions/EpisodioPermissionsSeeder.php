<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class EpisodioPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'episodio.view',
            'episodio.create',
            'episodio.update',
            'episodio.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }
    }
}