<?php

use App\Models\User;

it('prevents unauthorised creation of slot', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post('/slots', [])
        ->assertForbidden();
});