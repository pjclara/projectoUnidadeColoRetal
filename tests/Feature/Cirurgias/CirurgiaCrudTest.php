<?php

use App\Models\User;

it('prevents unauthorised creation of cirurgia', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post('/cirurgias', [])
        ->assertForbidden();
});