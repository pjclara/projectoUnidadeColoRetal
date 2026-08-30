<?php

use App\Services\SeguimentoService;

it('has a Seguimento service', function () {
    expect(class_exists(SeguimentoService::class))->toBeTrue();
});