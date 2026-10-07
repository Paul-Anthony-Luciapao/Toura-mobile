<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // DEV ONLY: every seeded account shares the password "password".
        if (app()->isProduction()) {
            $this->command?->error('UserSeeder is dev-only. Skipping.');

            return;
        }

        $users = [
            ['name' => 'Sofia Reyes', 'email' => 'sofia@traveler.ph', 'role' => 'traveler', 'phone' => '+63 917 555 0192', 'created_at' => '2025-11-10',
                'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'],
            ['name' => 'Mateo Cruz', 'email' => 'mateo@elnidobay.ph', 'role' => 'owner', 'phone' => '+63 928 555 4821', 'created_at' => '2025-08-15',
                'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'],
            ['name' => 'Carmen Salazar', 'email' => 'carmen@coroncove.ph', 'role' => 'owner', 'phone' => '+63 919 555 9320', 'created_at' => '2025-09-01',
                'avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'],
            ['name' => 'Danilo Villanueva', 'email' => 'danilo@longbeach.ph', 'role' => 'owner', 'phone' => '+63 930 555 7712', 'created_at' => '2025-10-05',
                'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'],
            ['name' => 'Toura Admin', 'email' => 'admin@toura.ph', 'role' => 'admin', 'phone' => '+63 917 000 0001', 'created_at' => '2025-01-01',
                'avatar' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'],
        ];

        foreach ($users as $data) {
            User::firstOrNew(['email' => $data['email']])
                ->forceFill($data + ['password' => 'password', 'status' => 'active'])
                ->save();
        }
    }
}