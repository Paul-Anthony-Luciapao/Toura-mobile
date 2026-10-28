<?php

namespace Database\Seeders;

use App\Models\TouristSpot;
use Illuminate\Database\Seeder;

class TouristSpotSeeder extends Seeder
{
    public function run(): void
    {
        $touristSpots = [
            [
                'id' => 1,   
                'name' => 'Kayangan Lake',
                'municipality' => 'Coron',
                'category' => 'Lakes & Lagoons',
                'description' => 'A famous lake known for its clear water and scenic limestone cliffs.',
                'image' => 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
                'tags' => ['lake', 'nature', 'swimming'],
                'rating' => 4.9,
                'review_count' => 1300000,
                'price' => 1200,
            ],
            [
                'id' => 2,
                'name' => 'Big Lagoon',
                'municipality' => 'El Nido',
                'category' => 'Islands & Lagoons',
                'description' => 'A beautiful lagoon surrounded by towering limestone formations.',
                'image' => 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
                'tags' => ['lagoon', 'island', 'kayaking'],
                'rating' => 4.9,
                'review_count' => 1300000,
                'price' => 1500,
            ],
            [
                'id' => 3,
                'name' => 'Nacpan Beach',
                'municipality' => 'El Nido',
                'category' => 'Beaches',
                'description' => 'A long stretch of sand known for its relaxing coastal scenery.',
                'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
                'tags' => ['beach', 'swimming', 'relaxation'],
                'rating' => 4.0,
                'review_count' => 900000,
                'price' => 1000,
            ],
            [
                'id' => 4,
                'name' => 'Puerto Princesa Subterranean River',
                'municipality' => 'Puerto Princesa',
                'category' => 'UNESCO World Heritage',
                'description' => 'An underground river flowing through a spectacular limestone cave system.',
                'image' => 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
                'tags' => ['cave', 'river', 'nature'],
                'rating' => 5.0,
                'review_count' => 2000000,
                'price' => 5000,
            ],
            [
                'id' => 5,
                'name' => 'Long Beach',
                'municipality' => 'San Vicente',
                'category' => 'Beaches',
                'description' => 'A long, scenic beach on the coast of San Vicente.',
                'image' => 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda',
                'tags' => ['beach', 'coast', 'relaxation'],
                'rating' => 4.2,
                'review_count' => 1500000,
                'price' => 1310,
            ],
            [
                'id' => 6,
                'name' => 'Twin Lagoon',
                'municipality' => 'Coron',
                'category' => 'Lakes & Lagoons',
                'description' => 'A pair of connected lagoons surrounded by limestone cliffs.',
                'image' => 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
                'tags' => ['lagoon', 'nature', 'swimming'],
                'rating' => 4.3,
                'review_count' => 1200000,
                'price' => 1450,
            ],
        ];

        foreach ($touristSpots as $spot) {
            TouristSpot::updateOrCreate(
                [
                    'name' => $spot['name'],
                    'municipality' => $spot['municipality'],
                ],
                $spot
            );
        }
    }
}
