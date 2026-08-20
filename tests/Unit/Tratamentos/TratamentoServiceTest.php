<?php

use App\Services\TratamentoService;

it('has a Tratamento service', function () {
    expect(class_exists(TratamentoService::class))->toBeTrue();
});