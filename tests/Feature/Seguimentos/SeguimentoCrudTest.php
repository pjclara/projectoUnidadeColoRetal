<?php

use App\Models\User;

it('prevents unauthorised creation of seguimento', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post('/seguimentos', [])
        ->assertForbidden();
});