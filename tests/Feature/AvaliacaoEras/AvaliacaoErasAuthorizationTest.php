<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;

it('requires authentication to access avaliacaoEras', function () {
    $this->get('/avaliacao-eras')
        ->assertRedirect();
});

it('forbids a user without permission', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/avaliacao-eras')
        ->assertForbidden();
});

it('allows a user with view permission', function () {
    $user = User::factory()->create();

    Permission::findOrCreate('avaliacao-era.view');

    $user->givePermissionTo('avaliacao-era.view');

    $this->actingAs($user);

    $this->get('/avaliacao-eras')
        ->assertSuccessful();
});