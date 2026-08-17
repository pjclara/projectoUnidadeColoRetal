<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;

it('requires authentication to access episodio', function () {
    $this->get('/episodios')
        ->assertRedirect();
});

it('forbids a user without permission', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/episodios')
        ->assertForbidden();
});

it('allows a user with view permission', function () {
    $user = User::factory()->create();

    Permission::findOrCreate('episodio.view');

    $user->givePermissionTo('episodio.view');

    $this->actingAs($user);

    $this->get('/episodios')
        ->assertSuccessful();
});