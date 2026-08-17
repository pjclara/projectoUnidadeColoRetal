<?php

use App\Models\User;

it('prevents unauthorised creation of casoEquipa', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post('/caso-equipas', [])
        ->assertForbidden();
});