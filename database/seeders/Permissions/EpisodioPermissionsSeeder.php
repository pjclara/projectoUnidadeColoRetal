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

                // assign the permissions to a role (e.g., 'admin')
        $adminRole = \Spatie\Permission\Models\Role::findByName('admin');
        $adminRole->givePermissionTo($permissions);
    }
}