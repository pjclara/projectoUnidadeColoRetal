<?php

use App\Http\Controllers\AtendimentoController;
use App\Http\Controllers\CasoEquipaController;
use App\Http\Controllers\CasoPlaneadoController;
use App\Http\Controllers\CDTController;
use App\Http\Controllers\DoenteController;
use App\Http\Controllers\EpisodioController;
use App\Http\Controllers\RolePermissionController;
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

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

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

    Route::resource('cdts', CDTController::class)->only(['index',  'store', 'show',  'update', 'destroy']);
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

    Route::get('/atendimentos/novo', [AtendimentoController::class, 'create'])
        ->middleware('can:doente.view')
        ->name('atendimentos.legacy');

});
