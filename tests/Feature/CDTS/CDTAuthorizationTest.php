<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;

it('requires authentication to access cDT', function () {
    $this->get('/c-d-t-s')
        ->assertRedirect();
});

it('forbids a user without permission', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/c-d-t-s')
        ->assertForbidden();
});

it('allows a user with view permission', function () {
    $user = User::factory()->create();

    Permission::findOrCreate('c-d-t.view');

    $user->givePermissionTo('c-d-t.view');

    $this->actingAs($user);

    $this->get('/c-d-t-s')
        ->assertSuccessful();
});