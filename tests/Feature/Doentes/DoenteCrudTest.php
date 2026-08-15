<?php

use App\Models\User;

it('prevents unauthorised creation of doente', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post('/doentes', [])
        ->assertForbidden();
});