<?php

namespace Tests\Feature;

use Tests\TestCase;

class ResortApiTest extends TestCase
{
    public function test_public_resorts_endpoint_returns_successful_json_response(): void
    {
        $response = $this->getJson('/api/v1/resorts');

        $response->assertOk();
        $response->assertJsonIsArray();
    }
}