<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;

it('requires authentication to access slot', function () {
    $this->get('/slots')
        ->assertRedirect();
});

it('forbids a user without permission', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/slots')
        ->assertForbidden();
});

it('allows a user with view permission', function () {
    $user = User::factory()->create();

    Permission::findOrCreate('slot.view');

    $user->givePermissionTo('slot.view');

    $this->actingAs($user);

    $this->get('/slots')
        ->assertSuccessful();
});