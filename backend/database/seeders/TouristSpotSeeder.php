<?php

namespace Database\Seeders;

use App\Models\TouristSpot;
use Illuminate\Database\Seeder;

class TouristSpotSeeder extends Seeder
{
    public function run(): void
    {
        $spots = [
            ['name' => 'Kayangan Lake', 'municipality' => 'Coron', 'category' => 'Lakes & Lagoons', 'description' => 'Reputed as the cleanest inland body of water in Asia.', 'image' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80', 'tags' => ['Snorkeling', 'Limestone Cliffs'], 'rating' => 4.9, 'review_count' => 1300000, 'price' => 1200],
            ['name' => 'Big Lagoon', 'municipality' => 'El Nido', 'category' => 'Islands & Lagoons', 'description' => 'An iconic emerald lagoon flanked by majestic karst spires.', 'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', 'tags' => ['Kayaking', 'Iconic Spot'], 'rating' => 4.9, 'review_count' => 1300000, 'price' => 1500],
            ['name' => 'Nacpan Beach', 'municipality' => 'El Nido', 'category' => 'Beaches', 'description' => 'A 4-kilometer continuous stretch of golden powdery sand.', 'image' => 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', 'tags' => ['Sunset', 'Twin Beach'], 'rating' => 4.0, 'review_count' => 900000, 'price' => 1000],
            ['name' => 'Puerto Princesa Subterranean River', 'municipality' => 'Puerto Princesa', 'category' => 'UNESCO World Heritage', 'description' => 'One of the New 7 Wonders of Nature.', 'image' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', 'tags' => ['UNESCO Site', 'Cave Tour'], 'rating' => 5.0, 'review_count' => 2000000, 'price' => 5000],
            ['name' => 'Long Beach', 'municipality' => 'San Vicente', 'category' => 'Beaches', 'description' => 'The longest white/golden sand beach in the Philippines.', 'image' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80', 'tags' => ['Longest Beach', 'Surfing'], 'rating' => 4.2, 'review_count' => 1500000, 'price' => 1310],
            ['name' => 'Twin Lagoon', 'municipality' => 'Coron', 'category' => 'Lakes & Lagoons', 'description' => 'Two breathtaking emerald lagoons separated by a limestone wall.', 'image' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', 'tags' => ['Swim-Through', 'Scenic'], 'rating' => 4.3, 'review_count' => 1200000, 'price' => 1450],
        ];

        foreach ($spots as $spot) {
            TouristSpot::updateOrCreate(['name' => $spot['name']], $spot);
        }
    }
}