# Toura Mobile

Toura is a full-stack travel app with a React Native and Expo frontend and a Laravel API backend.

## Prerequisites

- Node.js 20 or later and npm
- PHP 8.3 or later and Composer
- Git
- Android Studio or Xcode if you plan to use an emulator or simulator

The frontend uses Expo SDK 57. Use the Expo CLI through `npx expo`; a global Expo CLI installation is not required.

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

From the `backend/` directory, create the local environment file and application key:

```bash
cp .env.example .env
php artisan key:generate
```

The example environment uses SQLite. Create its database file if it does not exist, then run the migrations:

```bash
touch database/database.sqlite
php artisan migrate
```

Optionally seed the database with the included development data:

```bash
php artisan db:seed
```

Start the API from `backend/`:

```bash
php artisan serve
```

By default, Laravel serves at `http://127.0.0.1:8000`. You can check that it is reachable with:

```bash
curl http://127.0.0.1:8000/api/test
```

## Configure the frontend API URL

The frontend reads `EXPO_PUBLIC_API_URL` from a root-level `.env` file. Copy the example and set its value to the address where the backend can be reached:

```bash
cd ..
cp .env.example .env
```

```dotenv
EXPO_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

The app adds `/v1` automatically, so do not include it in this value. `EXPO_PUBLIC_` values are embedded in the client bundle; do not put secrets in them.

Choose a host address that is reachable from the frontend:

- iOS simulator or web on the same computer: `http://127.0.0.1:8000/api`
- Android emulator: `http://10.0.2.2:8000/api`
- Physical device: `http://<your-computer-lan-ip>:8000/api`

For a physical device, connect it and the computer to the same network. If you change the environment file while Expo is running, restart the development server and clear its cache with `npx expo start --clear`.

## Run the app

Run the backend and frontend in separate terminals.

Terminal 1:

```bash
cd backend
php artisan serve
```

Terminal 2, from the repository root:

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

## Troubleshooting

### The app cannot connect to Laravel

Confirm the backend is running and that `EXPO_PUBLIC_API_URL` uses a host reachable from the device or emulator. Do not edit `src/services/api.ts` to change the local server address; configure the root `.env` file instead. Restart Expo after changing environment values.

### Composer reports a PHP version conflict

The Laravel backend requires PHP 8.3 or later. Check the PHP version used by your terminal with:

```bash
php -v
composer -V
```

### Laravel cannot open the SQLite database

Make sure `backend/.env` uses the SQLite connection and that `backend/database/database.sqlite` exists and is writable. Re-run the migrations after creating the file.

## Project structure

```text
Toura-mobile/
├── backend/
│   ├── app/
│   ├── database/
│   ├── routes/
│   ├── tests/
│   ├── .env.example
│   └── artisan
├── src/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── lib/
│   └── services/
├── .env.example
├── app.json
├── package.json
└── README.md
```
