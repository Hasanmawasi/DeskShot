<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class SignupTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $user = User::factory()->make();
        $password = "password";
        $response = $this->postJson("/api/v0.1/signup",[
            "name"=> $user->name,
            "email"=>$user->email,
            "password"=>  $password,
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    "success"=> true,
                    "user"=> [
                        "name"=> $user->name ,
                        "email"=> $user->email,
                    ],
                ]);

        }


}
