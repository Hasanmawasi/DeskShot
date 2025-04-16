<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatsController;
use App\Http\Controllers\LogsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::group(["prefix" => "v0.1"], function(){

    Route::post("/login",[AuthController::class , "login"]);
    Route::post("/signup",[AuthController::class , "register"]);

    Route::group(["middleware" => "auth:api"], function(){

        Route::get('/validatetoken',[AuthController::class,"validateToken"]);
        Route::post('/log',[LogsController::class,"log"]);
        Route::get('/message',[ChatsController::class,"getMessages"]);
    });
});
