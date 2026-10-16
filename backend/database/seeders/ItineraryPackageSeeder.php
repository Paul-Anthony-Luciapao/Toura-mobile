<?php

namespace Database\Seeders;

use App\Models\ItineraryPackage;
use Illuminate\Database\Seeder;

class ItineraryPackageSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            [
                'id' => 'spot-1',
                'spot_id' => 'spot-1',
                'resort_id' => 'resort-2',
                'title' => 'Kayangan Lake Itinerary Package',
                'destination' => 'Palawan',
                'start_date' => '2026-10-10',
                'titles' => ['Arrive in Coron', 'Kayangan Lake', 'Coron town', 'Island hopping', 'Departure'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 19600],
                    ['label' => 'Tours and activities', 'amount' => 4800],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['Resort stay', 'Guided lake tour', 'Airport transfers', 'Local permits'],
            ],
            [
                'id' => 'spot-2',
                'spot_id' => 'spot-2',
                'resort_id' => 'resort-1',
                'title' => 'Big Lagoon Itinerary Package',
                'destination' => 'Palawan',
                'start_date' => '2026-10-17',
                'titles' => ['Arrive in El Nido', 'Big Lagoon', 'Island beaches', 'Coastal day', 'Departure'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 23200],
                    ['label' => 'Tours and activities', 'amount' => 6000],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['Resort stay', 'Lagoon excursion', 'Boat transfers', 'Local permits'],
            ],
            [
                'id' => 'spot-3',
                'spot_id' => 'spot-3',
                'resort_id' => 'resort-1',
                'title' => 'Nacpan Beach Itinerary Package',
                'destination' => 'Palawan',
                'start_date' => '2026-10-24',
                'titles' => ['Arrive in El Nido', 'Nacpan Beach', 'Beach and town', 'Free exploration', 'Departure'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 23200],
                    ['label' => 'Tours and activities', 'amount' => 4000],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['Resort stay', 'Beach transfer', 'Breakfast', 'Local guide'],
            ],
            [
                'id' => 'spot-4',
                'spot_id' => 'spot-4',
                'resort_id' => 'resort-4',
                'title' => 'Puerto Princesa Underground River Itinerary Package',
                'destination' => 'Palawan',
                'start_date' => '2026-10-31',
                'titles' => ['Arrive in Puerto Princesa', 'Underground River', 'Sabang coast', 'City tour', 'Departure'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 16800],
                    ['label' => 'Tours and activities', 'amount' => 20000],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['Resort stay', 'River tour', 'Boat transfer', 'Park permits'],
            ],
            [
                'id' => 'spot-5',
                'spot_id' => 'spot-5',
                'resort_id' => 'resort-3',
                'title' => 'Long Beach Itinerary Package',
                'destination' => 'Palawan',
                'start_date' => '2026-11-07',
                'titles' => ['Arrive in San Vicente', 'Long Beach', 'Surf and coast', 'Free beach day', 'Departure'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 15200],
                    ['label' => 'Tours and activities', 'amount' => 5240],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['Resort stay', 'Beach transfer', 'Breakfast', 'Surfboard rental'],
            ],
            [
                'id' => 'spot-6',
                'spot_id' => 'spot-6',
                'resort_id' => 'resort-2',
                'title' => 'Twin Lagoon Itinerary Package',
                'destination' => 'Palawan',
                'start_date' => '2026-11-14',
                'titles' => ['Arrive in Coron', 'Twin Lagoon', 'Reef excursion', 'Coron town', 'Departure'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 19600],
                    ['label' => 'Tours and activities', 'amount' => 5800],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['Resort stay', 'Lagoon excursion', 'Boat transfers', 'Snorkel gear'],
            ],
            [
                'id' => 'spot-7',
                'spot_id' => 'spot-7',
                'resort_id' => 'resort-5',
                'title' => 'Kawasan Falls Itinerary Package',
                'destination' => 'Cebu',
                'start_date' => '2026-11-21',
                'titles' => ['Arrive in Cebu', 'Kawasan Falls', 'Cebu City', 'Island hopping', 'Departure'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 18000],
                    ['label' => 'Tours and activities', 'amount' => 4400],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['Lodge stay', 'Falls and canyoneering', 'Transfers', 'Breakfast'],
            ],
            [
                'id' => 'spot-8',
                'spot_id' => 'spot-8',
                'resort_id' => 'resort-6',
                'title' => 'Mines View Park Itinerary Package',
                'destination' => 'Baguio',
                'start_date' => '2026-11-28',
                'titles' => ['Arrive in Baguio', 'Mines View Park', 'Strawberry farm', 'Baguio city', 'Departure'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 12800],
                    ['label' => 'Tours and activities', 'amount' => 2000],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['Lodge stay', 'City tour', 'Transfers', 'Breakfast'],
            ],
            [
                'id' => 'spot-9',
                'spot_id' => 'spot-9',
                'resort_id' => 'resort-7',
                'title' => 'Cloud 9 Boardwalk Itinerary Package',
                'destination' => 'Siargao',
                'start_date' => '2026-12-05',
                'titles' => ['Arrive in Siargao', 'Cloud 9', 'Island hopping', 'Surf day', 'Departure'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 20800],
                    ['label' => 'Tours and activities', 'amount' => 3600],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['Lodge stay', 'Surf lesson', 'Island tour', 'Breakfast'],
            ],
            [
                'id' => 'spot-10',
                'spot_id' => 'spot-10',
                'resort_id' => 'resort-8',
                'title' => 'Calle Crisologo Itinerary Package',
                'destination' => 'Vigan',
                'start_date' => '2026-12-12',
                'titles' => ['Arrive in Vigan', 'Calle Crisologo', 'Heritage houses', 'Pottery and weaving', 'Departure'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 12000],
                    ['label' => 'Tours and activities', 'amount' => 2800],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['Heritage stay', 'Kalesa ride', 'Guided walk', 'Breakfast'],
            ],
        ];

        foreach ($packages as $package) {
            $titles = $package['titles'];
            unset($package['titles']);

            ItineraryPackage::updateOrCreate(
                ['id' => $package['id']],
                [
                    ...$package,
                    'days' => array_map(
                        fn (string $title, int $index) => [
                            'id' => 'day-'.($index + 1),
                            'title' => $title,
                            'notes' => [],
                        ],
                        $titles,
                        array_keys($titles),
                    ),
                    'reviews' => [],
                ],
            );
        }
    }
}
