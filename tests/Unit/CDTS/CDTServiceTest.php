<?php

use App\Services\CDTService;

it('has a CDT service', function () {
    expect(class_exists(CDTService::class))->toBeTrue();
});