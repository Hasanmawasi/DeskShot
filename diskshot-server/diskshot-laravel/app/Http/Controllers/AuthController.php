<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Log;

class AuthController extends Controller
{
    public function login(Request $request)
{

    $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);


    if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

        $user = Auth::user();

       /** @var \App\Models\User $user */
        $token = $user->createToken('authToken')->accessToken;

        return response()->json([
            'success' => true,
            'user' => $user,
            'token' => $token,
        ]);
    }

    return response()->json([
        'success' => false,
        'message' => 'Unauthorized',
    ], 401);
}

    public function register(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);


        $user = new User;
        $user->name = $request['name'];
        $user->email = $request['email'];
        $user->password = bcrypt($request['password']);
        $user->save();
        // Create an access token using Passport
        $token = $user->createToken('authToken')->accessToken;

        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function validateToken(Request $request)
{
    $token = $request->bearerToken(); // Extract token from request

    if (!$token) {
        return response()->json([
            "success" => false,
            "message" => "Unauthorized"
        ], 401);
    }

    // Retrieve the user using Passport's API guard
    $user = Auth::guard('api')->user();

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Invalid or expired token'
        ], 401);
    }

    return response()->json([
        'success' => true,
        'message' => 'Token is valid',
        'data' => $user
    ], 200);
}
}
