<?php

use App\Models\User;

it('prevents unauthorised creation of atividadeDiaria', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post('/atividade-diarias', [])
        ->assertForbidden();
});