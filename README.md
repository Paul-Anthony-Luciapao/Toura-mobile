# Toura Mobile

Toura is a full-stack travel app with a React Native and Expo frontend and a Laravel API backend.

## Prerequisites

- Node.js 20 or later and npm
- PHP 8.3 or later and Composer
- MySQL
- Git
- Android Studio or Xcode if you plan to use an emulator or simulator

The frontend uses Expo SDK 58. Use the Expo CLI through `npx expo`; a global Expo CLI installation is not required.

## Clone and install

```bash
git clone https://github.com/Paul-Anthony-Luciapao/Toura-mobile.git
cd Toura-mobile
npm ci
```

Install the Laravel dependencies:

```bash
cd backend
composer install
```

## Configure the backend

From `backend/`, create the local environment file and application key:

```bash
cp .env.example .env
php artisan key:generate
```

The example environment uses MySQL with the database name `toura`. Create that database, then update the `DB_*` values in `backend/.env` to match your local MySQL installation:

```sql
CREATE DATABASE toura;
```

Run the migrations and seed the sample data in a new local development database:

```bash
php artisan migrate
php artisan db:seed
php artisan db:seed --class=TouristSpotSeeder
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=ResortSeeder
```

These seeders add sample catalog data. `UserSeeder` is development-only and refuses to run in production; run it before `ResortSeeder`, which requires the seeded owner accounts. The demo accounts use the password `password`; never use them or that password in a live environment. Do not load sample seed data into a buyer's production database.

For local development, run the Laravel scheduler in a second terminal so unpaid bookings expire on time:

```bash
php artisan schedule:work
```

In production, configure Laravel's scheduler to invoke `php artisan schedule:run` every minute. Tour package prices are sample values; update seeded prices before accepting real bookings. Per-date operator capacity and availability are not configured yet, so bookings currently capture requests but do not reserve a limited number of tour seats.

Start the API from `backend/`:

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

The API is available at `http://127.0.0.1:8000` on your computer. You can check it with:

```bash
curl http://127.0.0.1:8000/api/test
```

## Configure the frontend API URL

The frontend reads `EXPO_PUBLIC_API_URL` from a root-level `.env` file. Copy the example and set the URL to the address where the backend can be reached:

```bash
cd ..
cp .env.example .env
```

Choose the appropriate host for your device:

- iOS simulator or web on the same computer: `http://127.0.0.1:8000/api`
- Android emulator: `http://10.0.2.2:8000/api`
- Physical device: `http://<your-computer-lan-ip>:8000/api`

For a physical device, connect it and the computer to the same network, and allow incoming connections to port 8000 through the computer's firewall. The app adds `/v1` automatically, so do not include it in `EXPO_PUBLIC_API_URL`. `EXPO_PUBLIC_` values are embedded in the client bundle; do not put secrets in them.

If you change the frontend `.env` while Expo is running, restart the development server so it reloads the value.

## Buyer handoff

This repository contains the Expo mobile app and its Laravel API source. A buyer should create their own hosting, database, Expo/EAS, Apple, Google Play, and payment-provider accounts, then configure the project with credentials they control. Do not transfer personal account passwords or reuse the seller's private keys. Rotate any integration credentials that were used during development.

### Current scope and demo data

- The app includes account flows, destination and service browsing, itinerary packages, bookings, conversations, and a PayMongo checkout integration.
- Itinerary schedules, prices, dates, and reviews include hardcoded demo data. Seeded tour prices are samples and must be replaced with approved operator pricing.
- Tour bookings do not reserve per-date operator capacity, so availability and overbooking rules need implementation before real inventory is sold.
- Date, duration, and filter controls on itinerary packages are visual only. Some entries on All Services are marked “Coming soon.”
- Local database seeders create sample catalog records. Review and replace those records before using a buyer's real database.

### Buyer configuration checklist

1. Set up a production Laravel environment and database. Generate a new `APP_KEY`, set `APP_ENV=production` and `APP_DEBUG=false`, and configure HTTPS, mail, storage, cache, and the scheduler for the chosen host.
2. Add `PAYMONGO_SECRET_KEY`, `PAYMONGO_WEBHOOK_SECRET`, and `PAYMONGO_PAYMENT_METHOD_TYPES` to the backend environment. Configure the PayMongo webhook to point to `/api/v1/webhooks/paymongo` and verify payment flows in the provider's test environment before enabling live credentials.
3. Set `FRONTEND_URL` and `FRONTEND_RESET_URL` to the buyer's real app/web deep links. Point `EXPO_PUBLIC_API_URL` at the deployed API base URL; it is public app configuration and must not contain secrets.
4. Set a stable Android package identifier in `app.json`. The iOS bundle identifier currently uses `com.jbalmarez.Toura-mobile` and should be changed to one controlled by the buyer before publishing.
5. Create buyer-owned Expo/EAS, Apple, and Google Play accounts and signing credentials. This repository does not include EAS build profiles; add and verify the buyer's build and store-submission configuration as part of their release setup.
6. Replace demo content and prices, confirm inventory and cancellation rules, review legal and privacy content, and run the app through the buyer's target-device and payment test plan.

### Repository hygiene

Real `.env` files and common signing-key files are ignored by Git. Only `.env.example` files should be shared with the source. Before delivery, review the final Git-tracked file list and remove any customer data, private keys, provider credentials, or account exports. Store buyer-specific secrets in their deployment provider, not in this repository or the mobile bundle.

## Run the app

Run the backend and frontend in separate terminals.

Terminal 1, from `backend/`:

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

Terminal 2, from the project root:

```bash
npm start
```

Use the Expo terminal to open the app in a development build, simulator/emulator, or supported web target.

## Useful commands

Frontend (repository root):

```bash
npm start
npx expo start --android
npx expo start --ios
npx expo start --web
npm run lint
```

The root `package-lock.json` and `backend/composer.lock` pin dependency versions for repeatable installs. `npm run lint` is available for a basic source check; this README does not claim that a production build, store submission, or live payment has been verified.

Backend (`backend/`):

```bash
php artisan migrate
php artisan db:seed
php artisan test
php artisan serve
```
