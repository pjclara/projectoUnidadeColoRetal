<?php

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

    Route::resource('users', UserController::class)->only(['store']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// Doente Module
Route::middleware('auth')->group(function () {
    Route::get('/doentes', [\App\Http\Controllers\DoenteController::class, 'index'])
        ->middleware('can:doente.view')
        ->name('doentes.index');

    Route::get('/doentes/create', [\App\Http\Controllers\DoenteController::class, 'create'])
        ->middleware('can:doente.create')
        ->name('doentes.create');

    Route::post('/doentes', [\App\Http\Controllers\DoenteController::class, 'store'])
        ->middleware('can:doente.create')
        ->name('doentes.store');

    Route::get('/doentes/{doente}', [\App\Http\Controllers\DoenteController::class, 'show'])
        ->middleware('can:doente.view')
        ->name('doentes.show');

    Route::get('/doentes/{doente}/edit', [\App\Http\Controllers\DoenteController::class, 'edit'])
        ->middleware('can:doente.update')
        ->name('doentes.edit');

    Route::put('/doentes/{doente}', [\App\Http\Controllers\DoenteController::class, 'update'])
        ->middleware('can:doente.update')
        ->name('doentes.update');

    Route::delete('/doentes/{doente}', [\App\Http\Controllers\DoenteController::class, 'destroy'])
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
    Route::resource('users', UserController::class)->only(['index', 'store']);
});
