<?php

namespace Database\Seeders;

use App\Models\Resort;
use App\Models\User;
use Illuminate\Database\Seeder;

class ResortSeeder extends Seeder
{
    public function run(): void
    {
        $mateo = User::where('email', 'mateo@elnidobay.ph')->firstOrFail();
        $carmen = User::where('email', 'carmen@coroncove.ph')->firstOrFail();
        $danilo = User::where('email', 'danilo@longbeach.ph')->firstOrFail();

        $resort = Resort::updateOrCreate(
            ['name' => 'El Nido Bayview Cliffside Villas'],
            [
                'owner_id' => $mateo->id,
                'tagline' => 'Perched above Bacuit Bay with private sunset terraces and crystal lagoon access',
                'municipality' => 'El Nido',
                'location' => 'Corong-Corong Beach, El Nido, Palawan',
                'description' => 'Tucked against the limestone cliffs of El Nido overlooking Bacuit Bay, El Nido Bayview Cliffside Villas offers sustainable luxury and authentic Palawan hospitality.',
                'cover_image' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85',
                'images' => [
                    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
                    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=85',
                ],
                'rating' => 4.92,
                'review_count' => 84,
                'base_price' => 5800,
                'amenities' => ['Ocean View', 'Infinity Pool', 'Free Island Breakfast', 'Private Kayak Rentals', 'Starlink High-Speed Wi-Fi', 'Airport Transfer'],
                'status' => 'published',
            ],
        );
        $resort->accommodations()->delete();
        $resort->offers()->delete();
        $resort->accommodations()->createMany([
            ['title' => 'Cliffside Ocean Suite', 'description' => 'Spacious master bedroom facing the sunset with a private wooden sun deck.', 'price_per_night' => 5800, 'capacity' => 2, 'bed_type' => '1 King Bed', 'bed_count' => 1, 'available_units' => 4, 'size' => 48, 'image' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', 'amenities' => ['King Bed', 'Private Terrace', 'Rain Shower']],
            ['title' => 'Bacuit Bay Deluxe Villa', 'description' => 'Two-level villa with living room, private plunge pool.', 'price_per_night' => 9200, 'capacity' => 4, 'bed_type' => '1 King Bed + 2 Single Daybeds', 'bed_count' => 3, 'available_units' => 2, 'size' => 82, 'image' => 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80', 'amenities' => ['Plunge Pool', 'Kitchenette']],
        ]);
        $resort->offers()->createMany([
            ['title' => '3D2N Bacuit Island Hopper Special', 'tag' => 'Best Value', 'description' => 'Includes 2 nights, private boat tour, daily breakfast.', 'discount_rate' => 18, 'valid_until' => '2026-12-31', 'inclusions' => ['Private Boat Tour', 'Daily Breakfast', 'Airport Shuttle']],
        ]);

        $resort2 = Resort::updateOrCreate(
            ['name' => 'Coron Sanctuary Eco Cove'],
            [
                'owner_id' => $carmen->id,
                'tagline' => "Eco-chic overwater bungalows and dive retreat in the heart of Coron's coral sanctuaries",
                'municipality' => 'Coron',
                'location' => 'Busuanga Island, Coron, Palawan',
                'description' => 'Nestled along an untouched marine sanctuary in Coron, this solar-powered sanctuary combines modern eco-architecture with underwater adventures.',
                'cover_image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
                'images' => [
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
                    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85',
                ],
                'rating' => 4.88,
                'review_count' => 62,
                'base_price' => 4900,
                'amenities' => ['Overwater Veranda', 'PADI Dive Center', 'Coral Reef Access', 'Solar Powered'],
                'status' => 'published',
            ],
        );
        $resort2->accommodations()->delete();
        $resort2->offers()->delete();
        $resort2->accommodations()->createMany([
            ['title' => 'Overwater Lagoon Bungalow', 'description' => 'Built directly above the crystal lagoon with glass floor panels.', 'price_per_night' => 6400, 'capacity' => 2, 'bed_type' => '1 Queen Bed', 'bed_count' => 1, 'available_units' => 5, 'size' => 42, 'image' => 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80', 'amenities' => ['Glass Floor Panel', 'Direct Lagoon Access']],
        ]);
        $resort2->offers()->createMany([
            ['title' => "Coron Wreck & Reef Diver's Package", 'tag' => 'Adventure', 'description' => 'Includes 3 nights stay, 4 guided dives.', 'discount_rate' => 25, 'valid_until' => '2026-10-31', 'inclusions' => ['4 Guided Dives', 'Full Equipment Rental']],
        ]);

        $resort3 = Resort::updateOrCreate(
            ['name' => 'San Vicente Sunset & Surf Retreat'],
            [
                'owner_id' => $danilo->id,
                'tagline' => "Unwind on the Philippines' longest 14-kilometer golden beach with barefoot tranquility",
                'municipality' => 'San Vicente',
                'location' => 'Long Beach, San Vicente, Palawan',
                'description' => 'Located on the world-renowned Long Beach in San Vicente, this peaceful boutique sanctuary offers vast stretches of untouched golden sand.',
                'cover_image' => 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85',
                'images' => [
                    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85',
                ],
                'rating' => 4.85,
                'review_count' => 41,
                'base_price' => 3800,
                'amenities' => ['14km Beach Access', 'Surfboard Rentals', 'Co-working Space', 'Pet Friendly'],
                'status' => 'published',
            ],
        );
        $resort3->accommodations()->delete();
        $resort3->offers()->delete();
        $resort3->accommodations()->createMany([
            ['title' => 'Sunset Driftwood Cabin', 'description' => 'Rustic artisan cabin with open ocean views.', 'price_per_night' => 3800, 'capacity' => 2, 'bed_type' => '1 Queen Bed', 'bed_count' => 1, 'available_units' => 6, 'size' => 35, 'image' => 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80', 'amenities' => ['Queen Bed', 'Hammock']],
        ]);
        $resort3->offers()->createMany([
            ['title' => 'Stay 4 Pay 3 Long Beach Escape', 'tag' => 'Extended Stay', 'description' => 'Book 4 nights or more and get the 4th night free.', 'discount_rate' => 25, 'valid_until' => '2026-12-15', 'inclusions' => ['Free 4th Night', 'Daily Sunrise Yoga']],
        ]);
    }
}