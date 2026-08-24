<?php

use App\Services\CirurgiaService;

it('has a Cirurgia service', function () {
    expect(class_exists(CirurgiaService::class))->toBeTrue();
});