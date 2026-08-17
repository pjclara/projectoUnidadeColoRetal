<?php

use App\Services\CasoEquipaService;

it('has a CasoEquipa service', function () {
    expect(class_exists(CasoEquipaService::class))->toBeTrue();
});