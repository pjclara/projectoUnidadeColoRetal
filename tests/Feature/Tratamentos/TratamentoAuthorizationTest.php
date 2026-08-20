<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;

it('requires authentication to access tratamento', function () {
    $this->get('/tratamentos')
        ->assertRedirect();
});

it('forbids a user without permission', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/tratamentos')
        ->assertForbidden();
});

it('allows a user with view permission', function () {
    $user = User::factory()->create();

    Permission::findOrCreate('tratamento.view');

    $user->givePermissionTo('tratamento.view');

    $this->actingAs($user);

    $this->get('/tratamentos')
        ->assertSuccessful();
});