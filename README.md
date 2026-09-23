# Toura Mobile

Toura is a full-stack travel app made of:

- React Native + Expo frontend in the root project
- Laravel backend in the `backend/` folder

This guide explains how to install dependencies, configure environment variables, and run the app locally.

## Prerequisites

Before starting, make sure you have the following installed:

- Node.js 20+
- npm
- Expo CLI (optional, but recommended)
- PHP 8.2+
- Composer
- Git
- Android Studio / Xcode (only if you want to run emulators)

## 1) Clone the repository

```bash
git clone <your-repo-url>
cd Toura-mobile
```

## 2) Install frontend dependencies

From the project root:

```bash
npm install
```

If you want to install Expo CLI globally:

```bash
npm install -g expo-cli
```

## 3) Install backend dependencies

This project includes a Laravel backend inside the `backend/` folder.

```bash
cd backend
composer install
```

## 4) Configure the Laravel environment

Copy the example env file:

```bash
cp .env.example .env
```

Then generate the app key:

```bash
php artisan key:generate
```

For the current setup, the backend is configured to use SQLite by default in `.env.example`, so no database host setup is required unless you want to switch to MySQL/PostgreSQL.

Run database migrations:

```bash
php artisan migrate
```

If needed, seed the database:

```bash
php artisan db:seed
```

## 5) Start the backend

From `backend/`:

```bash
php artisan serve
```

This usually runs the API at:

```text
http://127.0.0.1:8000
```

The Expo app is configured to call the Laravel API at:

```text
http://127.0.0.1:8000/api
```

If you are testing from a physical device, replace `127.0.0.1` with your machine's local IP address in `src/services/api.ts`.

## 6) Start the Expo app

Open a new terminal in the project root and run:

```bash
npm start
```

Or directly:

```bash
npx expo start
```

Then choose one of the following:

- Android emulator
- iOS simulator
- Expo Go on a physical device
- Web preview

## 7) Common startup flow

To run both apps together, use two terminals:

Terminal 1 - backend:

```bash
cd backend
php artisan serve
```

Terminal 2 - frontend:

```bash
cd ..
npm start
```

## 8) Troubleshooting

### Expo app cannot connect to Laravel

Check that Laravel is running and the API URL matches your environment.

Open `src/services/api.ts` and verify:

```ts
baseURL: "http://127.0.0.1:8000/api";
```

For physical devices, use something like:

```ts
baseURL: "http://192.168.1.10:8000/api";
```

### Composer install fails

Make sure PHP and Composer are installed correctly:

```bash
php -v
composer -V
```

### Laravel database issue

Check that the database file is writable and the `.env` file has a valid database configuration.

## 9) Useful commands

Frontend:

```bash
npm install
npm start
npx expo start --android
npx expo start --ios
npx expo start --web
```

Backend:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

## 10) Project structure

```text
Toura-mobile/
├── app.json
├── assets/
├── backend/
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── tests/
│   ├── .env.example
│   ├── composer.json
│   ├── artisan
│   └── README.md
├── src/
│   ├── app/
│   ├── components/
│   ├── data/
│   ├── lib/
│   ├── styles/
│   └── services/
├── package.json
├── tsconfig.json
└── README.md
```

## Notes

- The Expo frontend is the mobile app experience.
- The Laravel backend handles API endpoints and server-side logic.
- You usually run both at the same time during app development.
