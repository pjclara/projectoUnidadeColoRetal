<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;

it('requires authentication to access cirurgia', function () {
    $this->get('/cirurgias')
        ->assertRedirect();
});

it('forbids a user without permission', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/cirurgias')
        ->assertForbidden();
});

it('allows a user with view permission', function () {
    $user = User::factory()->create();

    Permission::findOrCreate('cirurgium.view');

    $user->givePermissionTo('cirurgium.view');

    $this->actingAs($user);

    $this->get('/cirurgias')
        ->assertSuccessful();
});