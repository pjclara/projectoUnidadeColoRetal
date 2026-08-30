<?php

use App\Services\AtividadeDiariaService;

it('has a AtividadeDiaria service', function () {
    expect(class_exists(AtividadeDiariaService::class))->toBeTrue();
});