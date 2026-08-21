<?php

use App\Services\SalaService;

it('has a Sala service', function () {
    expect(class_exists(SalaService::class))->toBeTrue();
});