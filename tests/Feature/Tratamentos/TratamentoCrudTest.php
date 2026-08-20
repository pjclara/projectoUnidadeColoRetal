<?php

use App\Models\User;

it('prevents unauthorised creation of tratamento', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post('/tratamentos', [])
        ->assertForbidden();
});