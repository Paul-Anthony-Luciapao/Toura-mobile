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
                'title' => 'San Vicente Long Beach Itinerary Package',
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
                'id' => 'spot-9',
                'spot_id' => 'spot-9',
                'resort_id' => 'resort-4',
                'title' => 'Balabac Islands Itinerary Package',
                'destination' => 'Palawan',
                'start_date' => '2026-11-28',
                'titles' => ['Arrive in Puerto Princesa', 'Travel to Balabac', 'Balabac island hopping', 'Sandbars and beaches', 'Return to Puerto Princesa'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 16800],
                    ['label' => 'Tours and activities', 'amount' => 10000],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['Puerto Princesa resort stay', 'Balabac land and boat transfers', 'Guided island-hopping tour', 'Local permits and fees'],
            ],
            [
                'id' => 'spot-10',
                'spot_id' => 'spot-10',
                'resort_id' => 'resort-1',
                'title' => 'Matinloc Island Itinerary Package',
                'destination' => 'Palawan',
                'start_date' => '2026-12-05',
                'titles' => ['Arrive in El Nido', 'Matinloc Island', 'Hidden beaches and coves', 'Coastal exploration', 'Departure'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 23200],
                    ['label' => 'Tours and activities', 'amount' => 6800],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['El Nido resort stay', 'Matinloc Island boat excursion', 'Boat transfers', 'Local permits'],
            ],
            [
                'id' => 'spot-11',
                'spot_id' => 'spot-11',
                'resort_id' => 'resort-1',
                'title' => 'Darocotan Island Itinerary Package',
                'destination' => 'Palawan',
                'start_date' => '2026-12-12',
                'titles' => ['Arrive in El Nido', 'Transfer to Darocotan Island', 'Island and reef day', 'Beach and free time', 'Return to El Nido'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 23200],
                    ['label' => 'Tours and activities', 'amount' => 5600],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['El Nido resort stay', 'Darocotan Island transfers', 'Local island excursion', 'Breakfast'],
            ],
            [
                'id' => 'spot-12',
                'spot_id' => 'spot-12',
                'resort_id' => 'resort-1',
                'title' => 'Catian Island Itinerary Package',
                'destination' => 'Palawan',
                'start_date' => '2026-12-19',
                'titles' => ['Arrive in El Nido', 'Boat trip to Catian Island', 'Island and lagoon exploration', 'Coastal day', 'Departure'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 23200],
                    ['label' => 'Tours and activities', 'amount' => 6000],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['El Nido resort stay', 'Guided island excursion', 'Boat transfers', 'Local permits where required'],
            ],
            [
                'id' => 'spot-13',
                'spot_id' => 'spot-13',
                'resort_id' => 'resort-1',
                'title' => 'Lio Beach Itinerary Package',
                'destination' => 'Palawan',
                'start_date' => '2026-11-21',
                'titles' => ['Arrive in El Nido', 'Lio Beach', 'Island and coastline', 'Free beach day', 'Departure'],
                'price_breakdown' => [
                    ['label' => 'Accommodation (4 nights)', 'amount' => 23200],
                    ['label' => 'Tours and activities', 'amount' => 4800],
                    ['label' => 'Transfers', 'amount' => 2400],
                    ['label' => 'Permits and fees', 'amount' => 1200],
                ],
                'inclusions' => ['Resort stay', 'Lio Beach transfer', 'Breakfast', 'Local transport assistance'],
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
