<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;

it('requires authentication to access doente', function () {
    $this->get('/doentes')
        ->assertRedirect();
});

it('forbids a user without permission', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/doentes')
        ->assertForbidden();
});

it('allows a user with view permission', function () {
    $user = User::factory()->create();

    Permission::findOrCreate('doente.view');

    $user->givePermissionTo('doente.view');

    $this->actingAs($user);

    $this->get('/doentes')
        ->assertSuccessful();
});