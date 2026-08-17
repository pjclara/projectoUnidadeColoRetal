<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;

it('requires authentication to access casoPlaneado', function () {
    $this->get('/caso-planeados')
        ->assertRedirect();
});

it('forbids a user without permission', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/caso-planeados')
        ->assertForbidden();
});

it('allows a user with view permission', function () {
    $user = User::factory()->create();

    Permission::findOrCreate('caso-planeado.view');

    $user->givePermissionTo('caso-planeado.view');

    $this->actingAs($user);

    $this->get('/caso-planeados')
        ->assertSuccessful();
});