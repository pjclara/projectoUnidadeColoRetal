<?php

use App\Services\AvaliacaoErasService;

it('has a AvaliacaoEras service', function () {
    expect(class_exists(AvaliacaoErasService::class))->toBeTrue();
});