<?php

use App\Services\DoenteService;

it('has a Doente service', function () {
    expect(class_exists(DoenteService::class))->toBeTrue();
});