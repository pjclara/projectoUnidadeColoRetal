<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;

it('requires authentication to access seguimento', function () {
    $this->get('/seguimentos')
        ->assertRedirect();
});

it('forbids a user without permission', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/seguimentos')
        ->assertForbidden();
});

it('allows a user with view permission', function () {
    $user = User::factory()->create();

    Permission::findOrCreate('seguimento.view');

    $user->givePermissionTo('seguimento.view');

    $this->actingAs($user);

    $this->get('/seguimentos')
        ->assertSuccessful();
});