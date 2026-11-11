<?php

namespace Database\Seeders;

use App\Models\Hotel;
use Illuminate\Database\Seeder;

class HotelSeeder extends Seeder
{
    public function run(): void
    {
        $hotels = [
            [
                'name' => 'H Hotel',
                'municipality' => 'El Nido',
                'description' => 'A vegan-friendly hotel in El Nido town.',
                'image_key' => 'h-hotel-el-nido',
            ],
            [
                'name' => 'The Henry Resort Qi El Nido',
                'municipality' => 'El Nido',
                'description' => 'A boutique hotel and resort stay in El Nido.',
                'image_key' => 'henry-resort-qi-el-nido',
            ],
            [
                'name' => 'Z Garden Hotel',
                'municipality' => 'El Nido',
                'description' => 'A hotel beside El Nido port.',
                'image_key' => 'z-garden-hotel',
            ],
            [
                'name' => 'Namal',
                'municipality' => 'El Nido',
                'description' => 'A boutique hotel on Hama Street in El Nido.',
                'image_key' => 'namal-el-nido',
            ],
            [
                'name' => 'J Boutique Hotel',
                'municipality' => 'El Nido',
                'description' => 'A boutique hotel in El Nido town.',
                'image_key' => 'j-boutique-hotel',
            ],
            [
                'name' => 'Coron 180 Hotel',
                'municipality' => 'Coron',
                'description' => 'A hotel in Coron Town Proper.',
                'image_key' => 'coron-180-hotel',
            ],
            [
                'name' => 'Ocean Star Hotel Coron',
                'municipality' => 'Coron',
                'description' => 'A hotel in Coron town.',
                'image_key' => 'ocean-star-hotel-coron',
            ],
            [
                'name' => 'Charms Hotel Coron',
                'municipality' => 'Coron',
                'description' => 'A hotel in Coron.',
                'image_key' => 'charms-hotel-coron',
            ],
            [
                'name' => 'Hue Hotels & Resorts Puerto Princesa',
                'municipality' => 'Puerto Princesa',
                'description' => 'A hotel in Puerto Princesa city.',
                'image_key' => 'hue-puerto-princesa',
            ],
            [
                'name' => 'The Legend Palawan',
                'municipality' => 'Puerto Princesa',
                'description' => 'A hotel in Puerto Princesa city.',
                'image_key' => 'the-legend-palawan',
            ],
        ];

        foreach ($hotels as $sortOrder => $hotel) {
            Hotel::updateOrCreate(
                ['image_key' => $hotel['image_key']],
                [...$hotel, 'sort_order' => $sortOrder, 'is_active' => true],
            );
        }
    }
}
