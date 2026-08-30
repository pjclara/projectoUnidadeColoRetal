<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;

it('requires authentication to access atividadeDiaria', function () {
    $this->get('/atividade-diarias')
        ->assertRedirect();
});

it('forbids a user without permission', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/atividade-diarias')
        ->assertForbidden();
});

it('allows a user with view permission', function () {
    $user = User::factory()->create();

    Permission::findOrCreate('atividade-diarium.view');

    $user->givePermissionTo('atividade-diarium.view');

    $this->actingAs($user);

    $this->get('/atividade-diarias')
        ->assertSuccessful();
});