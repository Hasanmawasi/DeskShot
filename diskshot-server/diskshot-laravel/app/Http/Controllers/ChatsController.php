<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;

use function PHPUnit\Framework\returnSelf;

class ChatsController extends Controller
{
    public function getMessages(){
        $message = Chat::with(['user:id,name'])->get();
        return response()->json([
            'success'=>true,
            'messages'=> $message,
        ]);
    }
}
