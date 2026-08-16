<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\Permissions\DoentePermissionsSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // RUN THE ROLES AND PERMISSIONS SEEDER
        $this->call(RolesAndPermissionsSeeder::class);
        $this->call(DoentePermissionsSeeder::class);

        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'pjclara@gmail.com',
        ]);

        $admin->assignRole('admin');
    }
}
