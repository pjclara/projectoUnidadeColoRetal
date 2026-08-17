<?php

use App\Services\CasoPlaneadoService;

it('has a CasoPlaneado service', function () {
    expect(class_exists(CasoPlaneadoService::class))->toBeTrue();
});