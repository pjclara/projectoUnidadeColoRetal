<?php

use App\Models\User;

it('prevents unauthorised creation of sala', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post('/salas', [])
        ->assertForbidden();
});