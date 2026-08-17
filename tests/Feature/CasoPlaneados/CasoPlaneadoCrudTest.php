<?php

use App\Models\User;

it('prevents unauthorised creation of casoPlaneado', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post('/caso-planeados', [])
        ->assertForbidden();
});