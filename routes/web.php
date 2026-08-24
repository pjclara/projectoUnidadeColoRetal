<?php

use App\Http\Controllers\AtendimentoController;
use App\Http\Controllers\CasoEquipaController;
use App\Http\Controllers\CasoPlaneadoController;
use App\Http\Controllers\CDTController;
use App\Http\Controllers\DoenteController;
use App\Http\Controllers\EpisodioController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\TratamentoController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// Doente Module
Route::middleware('auth')->group(function () {
    Route::get('/doentes', [DoenteController::class, 'index'])
        ->middleware('can:doente.view')
        ->name('doentes.index');

    Route::get('/doentes/create', [DoenteController::class, 'create'])
        ->middleware('can:doente.create')
        ->name('doentes.create');

    Route::post('/doentes', [DoenteController::class, 'store'])
        ->middleware('can:doente.create')
        ->name('doentes.store');

    Route::get('/doentes/{doente}', [DoenteController::class, 'show'])
        ->middleware('can:doente.view')
        ->name('doentes.show');

    Route::get('/doentes/{doente}/edit', [DoenteController::class, 'edit'])
        ->middleware('can:doente.update')
        ->name('doentes.edit');

    Route::put('/doentes/{doente}', [DoenteController::class, 'update'])
        ->middleware('can:doente.update')
        ->name('doentes.update');

    Route::delete('/doentes/{doente}', [DoenteController::class, 'destroy'])
        ->middleware('can:doente.delete')
        ->name('doentes.destroy');

    // Gestão de RBAC (roles & permissions)
    Route::get('/access-control', [RolePermissionController::class, 'index']);

    Route::post('/access-control/roles', [RolePermissionController::class, 'storeRole'])
        ->middleware('can:users.manage');
    Route::put('/access-control/roles/{role}', [RolePermissionController::class, 'updateRole'])
        ->middleware('can:users.manage');
    Route::delete('/access-control/roles/{role}', [RolePermissionController::class, 'destroyRole'])
        ->middleware('can:users.manage');

    Route::post('/access-control/permissions', [RolePermissionController::class, 'storePermission'])
        ->middleware('can:users.manage');
    Route::put('/access-control/permissions/{permission}', [RolePermissionController::class, 'updatePermission'])
        ->middleware('can:users.manage');
    Route::delete('/access-control/permissions/{permission}', [RolePermissionController::class, 'destroyPermission'])
        ->middleware('can:users.manage');

    // users resource routes
    Route::resource('users', UserController::class)->only(['index', 'store', 'update']);
});

// CDT Module
Route::middleware('auth')->group(function () {
    Route::get('/c-d-t-s', [CDTController::class, 'index'])
        ->middleware('can:c-d-t.view')
        ->name('c-d-t-s.index');

    Route::get('/c-d-t-s/create', [CDTController::class, 'create'])
        ->middleware('can:c-d-t.create')
        ->name('c-d-t-s.create');

    Route::post('/c-d-t-s', [CDTController::class, 'store'])
        ->middleware('can:c-d-t.create')
        ->name('c-d-t-s.store');

    Route::get('/c-d-t-s/{cDT}', [CDTController::class, 'show'])
        ->middleware('can:c-d-t.view')
        ->name('c-d-t-s.show');

    Route::get('/c-d-t-s/{cDT}/edit', [CDTController::class, 'edit'])
        ->middleware('can:c-d-t.update')
        ->name('c-d-t-s.edit');

    Route::put('/c-d-t-s/{cDT}', [CDTController::class, 'update'])
        ->middleware('can:c-d-t.update')
        ->name('c-d-t-s.update');

    Route::delete('/c-d-t-s/{cDT}', [CDTController::class, 'destroy'])
        ->middleware('can:c-d-t.delete')
        ->name('c-d-t-s.destroy');
});

// CasoPlaneado Module
Route::middleware('auth')->group(function () {
    Route::get('/caso-planeados', [CasoPlaneadoController::class, 'index'])
        ->middleware('can:caso-planeado.view')
        ->name('caso-planeados.index');

    Route::get('/caso-planeados/create', [CasoPlaneadoController::class, 'create'])
        ->middleware('can:caso-planeado.create')
        ->name('caso-planeados.create');

    Route::post('/caso-planeados', [CasoPlaneadoController::class, 'store'])
        ->middleware('can:caso-planeado.create')
        ->name('caso-planeados.store');

    Route::get('/caso-planeados/{casoPlaneado}', [CasoPlaneadoController::class, 'show'])
        ->middleware('can:caso-planeado.view')
        ->name('caso-planeados.show');

    Route::get('/caso-planeados/{casoPlaneado}/edit', [CasoPlaneadoController::class, 'edit'])
        ->middleware('can:caso-planeado.update')
        ->name('caso-planeados.edit');

    Route::put('/caso-planeados/{casoPlaneado}', [CasoPlaneadoController::class, 'update'])
        ->middleware('can:caso-planeado.update')
        ->name('caso-planeados.update');

    Route::delete('/caso-planeados/{casoPlaneado}', [CasoPlaneadoController::class, 'destroy'])
        ->middleware('can:caso-planeado.delete')
        ->name('caso-planeados.destroy');

    Route::post('/caso-planeados/{casoPlaneado}/equipas', [CasoPlaneadoController::class, 'storeEquipaForCasoPlaneado'])
        ->middleware('can:caso-equipa.create')
        ->name('caso-planeados.equipas.store');
});

// CasoEquipa Module
Route::middleware('auth')->group(function () {
    Route::get('/caso-equipas', [CasoEquipaController::class, 'index'])
        ->middleware('can:caso-equipa.view')
        ->name('caso-equipas.index');

    Route::get('/caso-equipas/create', [CasoEquipaController::class, 'create'])
        ->middleware('can:caso-equipa.create')
        ->name('caso-equipas.create');

    Route::post('/caso-equipas', [CasoEquipaController::class, 'store'])
        ->middleware('can:caso-equipa.create')
        ->name('caso-equipas.store');

    Route::get('/caso-equipas/{casoEquipa}', [CasoEquipaController::class, 'show'])
        ->middleware('can:caso-equipa.view')
        ->name('caso-equipas.show');

    Route::get('/caso-equipas/{casoEquipa}/edit', [CasoEquipaController::class, 'edit'])
        ->middleware('can:caso-equipa.update')
        ->name('caso-equipas.edit');

    Route::put('/caso-equipas/{casoEquipa}', [CasoEquipaController::class, 'update'])
        ->middleware('can:caso-equipa.update')
        ->name('caso-equipas.update');

    Route::delete('/caso-equipas/{casoEquipa}', [CasoEquipaController::class, 'destroy'])
        ->middleware('can:caso-equipa.delete')
        ->name('caso-equipas.destroy');

    Route::get('/cdts/create', [CDTController::class, 'create'])
        ->middleware('can:c-d-t.create')
        ->name('cdts.create');

    Route::post('/cdts/doentes', [CDTController::class, 'storeDoente'])
        ->middleware('can:doente.create')
        ->name('cdts.doentes.store');

    Route::post('/cdts', [CDTController::class, 'store'])
        ->middleware('can:c-d-t.create')
        ->name('cdts.store');

    Route::put('/cdts/{cDT}', [CDTController::class, 'update'])
        ->middleware('can:c-d-t.update')
        ->name('cdts.update');

    Route::get('/cdts/{cDT}', [CDTController::class, 'show'])
        ->middleware('can:c-d-t.view')
        ->name('cdts.show');

    Route::get('/cdts', [CDTController::class, 'index'])
        ->middleware('can:c-d-t.view')
        ->name('cdts.index');
});

// Episodio Module
Route::middleware('auth')->group(function () {
    Route::get('/episodios', [EpisodioController::class, 'index'])
        ->middleware('can:episodio.view')
        ->name('episodios.index');

    Route::get('/episodios/create', [EpisodioController::class, 'create'])
        ->middleware('can:episodio.create')
        ->name('episodios.create');

    Route::post('/episodios', [EpisodioController::class, 'store'])
        ->middleware('can:episodio.create')
        ->name('episodios.store');

    Route::get('/episodios/{episodio}', [EpisodioController::class, 'show'])
        ->middleware('can:episodio.view')
        ->name('episodios.show');

    Route::get('/episodios/{episodio}/edit', [EpisodioController::class, 'edit'])
        ->middleware('can:episodio.update')
        ->name('episodios.edit');

    Route::put('/episodios/{episodio}', [EpisodioController::class, 'update'])
        ->middleware('can:episodio.update')
        ->name('episodios.update');

    Route::delete('/episodios/{episodio}', [EpisodioController::class, 'destroy'])
        ->middleware('can:episodio.delete')
        ->name('episodios.destroy');
});

// Tratamento Module
Route::middleware('auth')->group(function () {
    Route::get('/tratamentos', [TratamentoController::class, 'index'])
        ->middleware('can:tratamento.view')
        ->name('tratamentos.index');

    Route::get('/tratamentos/create', [TratamentoController::class, 'create'])
        ->middleware('can:tratamento.create')
        ->name('tratamentos.create');

    Route::post('/tratamentos', [TratamentoController::class, 'store'])
        ->middleware('can:tratamento.create')
        ->name('tratamentos.store');

    Route::get('/tratamentos/{tratamento}', [TratamentoController::class, 'show'])
        ->middleware('can:tratamento.view')
        ->name('tratamentos.show');

    Route::get('/tratamentos/{tratamento}/edit', [TratamentoController::class, 'edit'])
        ->middleware('can:tratamento.update')
        ->name('tratamentos.edit');

    Route::put('/tratamentos/{tratamento}', [TratamentoController::class, 'update'])
        ->middleware('can:tratamento.update')
        ->name('tratamentos.update');

    Route::delete('/tratamentos/{tratamento}', [TratamentoController::class, 'destroy'])
        ->middleware('can:tratamento.delete')
        ->name('tratamentos.destroy');
});

// Sala Module
Route::middleware('auth')->group(function () {
    Route::get('/salas', [\App\Http\Controllers\SalaController::class, 'index'])
        ->middleware('can:sala.view')
        ->name('salas.index');

    Route::post('/salas', [\App\Http\Controllers\SalaController::class, 'store'])
        ->middleware('can:sala.create')
        ->name('salas.store');

    Route::get('/salas/{sala}', [\App\Http\Controllers\SalaController::class, 'show'])
        ->middleware('can:sala.view')
        ->name('salas.show');

    Route::put('/salas/{sala}', [\App\Http\Controllers\SalaController::class, 'update'])
        ->middleware('can:sala.update')
        ->name('salas.update');

    Route::delete('/salas/{sala}', [\App\Http\Controllers\SalaController::class, 'destroy'])
        ->middleware('can:sala.delete')
        ->name('salas.destroy');
});

// Slot Module
Route::middleware('auth')->group(function () {
    Route::get('/slots', [\App\Http\Controllers\SlotController::class, 'index'])
        ->middleware('can:slot.view')
        ->name('slots.index');

    Route::get('/slots/create', [\App\Http\Controllers\SlotController::class, 'create'])
        ->middleware('can:slot.create')
        ->name('slots.create');

    Route::post('/slots', [\App\Http\Controllers\SlotController::class, 'store'])
        ->middleware('can:slot.create')
        ->name('slots.store');

    Route::get('/slots/{slot}', [\App\Http\Controllers\SlotController::class, 'show'])
        ->middleware('can:slot.view')
        ->name('slots.show');

    Route::get('/slots/{slot}/edit', [\App\Http\Controllers\SlotController::class, 'edit'])
        ->middleware('can:slot.update')
        ->name('slots.edit');

    Route::put('/slots/{slot}', [\App\Http\Controllers\SlotController::class, 'update'])
        ->middleware('can:slot.update')
        ->name('slots.update');

    Route::delete('/slots/{slot}', [\App\Http\Controllers\SlotController::class, 'destroy'])
        ->middleware('can:slot.delete')
        ->name('slots.destroy');
});

// Cirurgia Module
Route::middleware('auth')->group(function () {
    Route::get('/cirurgias', [\App\Http\Controllers\CirurgiaController::class, 'index'])
        ->middleware('can:cirurgium.view')
        ->name('cirurgias.index');

    Route::get('/cirurgias/create', [\App\Http\Controllers\CirurgiaController::class, 'create'])
        ->middleware('can:cirurgium.create')
        ->name('cirurgias.create');

    Route::post('/cirurgias', [\App\Http\Controllers\CirurgiaController::class, 'store'])
        ->middleware('can:cirurgium.create')
        ->name('cirurgias.store');

    Route::get('/cirurgias/{cirurgia}', [\App\Http\Controllers\CirurgiaController::class, 'show'])
        ->middleware('can:cirurgium.view')
        ->name('cirurgias.show');

    Route::get('/cirurgias/{cirurgia}/edit', [\App\Http\Controllers\CirurgiaController::class, 'edit'])
        ->middleware('can:cirurgium.update')
        ->name('cirurgias.edit');

    Route::put('/cirurgias/{cirurgia}', [\App\Http\Controllers\CirurgiaController::class, 'update'])
        ->middleware('can:cirurgium.update')
        ->name('cirurgias.update');

    Route::delete('/cirurgias/{cirurgia}', [\App\Http\Controllers\CirurgiaController::class, 'destroy'])
        ->middleware('can:cirurgium.delete')
        ->name('cirurgias.destroy');
});

// AvaliacaoEras Module
Route::middleware('auth')->group(function () {
    Route::get('/avaliacao-eras', [\App\Http\Controllers\AvaliacaoErasController::class, 'index'])
        ->middleware('can:avaliacao-era.view')
        ->name('avaliacao-eras.index');

    Route::get('/avaliacao-eras/create', [\App\Http\Controllers\AvaliacaoErasController::class, 'create'])
        ->middleware('can:avaliacao-era.create')
        ->name('avaliacao-eras.create');

    Route::post('/avaliacao-eras', [\App\Http\Controllers\AvaliacaoErasController::class, 'store'])
        ->middleware('can:avaliacao-era.create')
        ->name('avaliacao-eras.store');

    Route::get('/avaliacao-eras/{avaliacaoEras}', [\App\Http\Controllers\AvaliacaoErasController::class, 'show'])
        ->middleware('can:avaliacao-era.view')
        ->name('avaliacao-eras.show');

    Route::get('/avaliacao-eras/{avaliacaoEras}/edit', [\App\Http\Controllers\AvaliacaoErasController::class, 'edit'])
        ->middleware('can:avaliacao-era.update')
        ->name('avaliacao-eras.edit');

    Route::put('/avaliacao-eras/{avaliacaoEras}', [\App\Http\Controllers\AvaliacaoErasController::class, 'update'])
        ->middleware('can:avaliacao-era.update')
        ->name('avaliacao-eras.update');

    Route::delete('/avaliacao-eras/{avaliacaoEras}', [\App\Http\Controllers\AvaliacaoErasController::class, 'destroy'])
        ->middleware('can:avaliacao-era.delete')
        ->name('avaliacao-eras.destroy');
});
