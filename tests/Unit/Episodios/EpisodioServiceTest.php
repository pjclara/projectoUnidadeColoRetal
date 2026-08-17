<?php

use App\Services\EpisodioService;

it('has a Episodio service', function () {
    expect(class_exists(EpisodioService::class))->toBeTrue();
});