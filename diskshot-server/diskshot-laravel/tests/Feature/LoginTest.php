<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
class LoginTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $user = User::factory()->create();
        $response = $this->postJson("/api/v0.1/login",[
            "email"=>$user->email,
            "password"=>'password',
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
