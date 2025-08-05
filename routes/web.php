<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LeaveRequestController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('leaves', function () {
        return Inertia::render('leaves');
    })->name('leaves');

    // Route::get('create-leaves', function () {
    //     return Inertia::render('create-leaves');
    // })->name('create.leaves');

    Route::get('create-leaves', [LeaveRequestController::class, 'create'])->name('create.leaves');

    Route::post('submit-leave', [LeaveRequestController::class, 'store'])->name('store.leave');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
