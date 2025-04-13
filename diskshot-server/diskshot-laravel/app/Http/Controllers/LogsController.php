<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Log;
class LogsController extends Controller
{
    public function log(Request $request){
        $user = Auth::user();
        $log = new Log;
        $log->user_id = $user->id;
        $log->action = $request['action'];
        $log->longitude = $request['longitude'];
        $log->latitude = $request['latitude'];
        $log->ip_addres = $request['ip_address'];
        $log->city = $request['city'];
        $log->country_name = $request['country_name'];
        if($log->save()){
        return response()->json([
            'success' => true,
            'message' => $log,
        ], 200);
       }
       return response()->json([
        'success' => false,
        'message' => "logs does not saved",
    ], 401);
    }
}
