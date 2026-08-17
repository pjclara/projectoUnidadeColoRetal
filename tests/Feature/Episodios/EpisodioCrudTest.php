<?php

use App\Models\User;

it('prevents unauthorised creation of episodio', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post('/episodios', [])
        ->assertForbidden();
});