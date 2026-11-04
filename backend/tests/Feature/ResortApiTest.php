<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResortApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_resorts_endpoint_returns_successful_json_response(): void
    {
        $response = $this->getJson('/api/v1/resorts');

        $response->assertOk()
            ->assertJsonStructure([
                'data',
                'links',
                'meta',
            ]);

        $response->assertJsonIsArray('data');
    }
}
