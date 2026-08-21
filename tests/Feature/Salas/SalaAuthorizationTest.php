<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;

it('requires authentication to access sala', function () {
    $this->get('/salas')
        ->assertRedirect();
});

it('forbids a user without permission', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/salas')
        ->assertForbidden();
});

it('allows a user with view permission', function () {
    $user = User::factory()->create();

    Permission::findOrCreate('sala.view');

    $user->givePermissionTo('sala.view');

    $this->actingAs($user);

    $this->get('/salas')
        ->assertSuccessful();
});