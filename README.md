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
npm install
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

Run the migrations and seed the sample data:

```bash
php artisan migrate
php artisan db:seed
php artisan db:seed --class=TouristSpotSeeder
```

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

Backend (`backend/`):

```bash
php artisan migrate
php artisan db:seed
php artisan test
php artisan serve
```
