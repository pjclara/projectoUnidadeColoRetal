<?php

use App\Models\User;

it('prevents unauthorised creation of avaliacaoEras', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post('/avaliacao-eras', [])
        ->assertForbidden();
});