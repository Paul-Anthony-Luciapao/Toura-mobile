# Toura API

This directory contains the Laravel API used by the Expo app. See the repository [README](../README.md) for prerequisites, local setup, environment configuration, seed data, and buyer handoff notes.

For local development, copy `.env.example` to `.env`, configure MySQL, generate an application key with `php artisan key:generate`, then run migrations and seeders as described in the root README. Keep real credentials in the ignored `.env` file or a deployment secret store; do not commit them.

The `UserSeeder` is development-only and uses shared demo credentials. Never run it in production. The catalog seeders also contain sample data and should not be treated as live inventory or pricing.
