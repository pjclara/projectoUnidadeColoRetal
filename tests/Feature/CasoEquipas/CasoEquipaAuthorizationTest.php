<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;

it('requires authentication to access casoEquipa', function () {
    $this->get('/caso-equipas')
        ->assertRedirect();
});

it('forbids a user without permission', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/caso-equipas')
        ->assertForbidden();
});

it('allows a user with view permission', function () {
    $user = User::factory()->create();

    Permission::findOrCreate('caso-equipa.view');

    $user->givePermissionTo('caso-equipa.view');

    $this->actingAs($user);

    $this->get('/caso-equipas')
        ->assertSuccessful();
});