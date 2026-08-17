<?php

use App\Models\User;

it('prevents unauthorised creation of cDT', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post('/c-d-t-s', [])
        ->assertForbidden();
});