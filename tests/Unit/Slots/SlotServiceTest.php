<?php

use App\Services\SlotService;

it('has a Slot service', function () {
    expect(class_exists(SlotService::class))->toBeTrue();
});