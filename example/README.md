# Jiter + Express + TypeScript example

A basic API for learning how to integrate your app with the Jiter API

## What does the app do?

This app exposes API routes which allow a user to create reminders to purchase groceries, edit reminders, and receive reminders all using Jiter events.

## Setup

1. Install dependencies via `yarn` or `npm install`
2. Run `yarn setup` to create your local environment file (or optionally run `cp .env.sample .env`)
3. Get your [API keys and signing secret](https://docs.jiter.dev/docs/getting-started) and add them to `.env`
4. Start the app with `yarn dev` (or optionally build and start with `yarn build && yarn start`)
5. Example API is running on localhost:8000

## Using the App

Once the app is up and running, there are a variety of routes you can utilize to experiment with the Jiter API:

| Method | Route                 | Purpose              |
| ------ | --------------------- | -------------------- |
| `GET`  | `/api/events `        | Finds all events     |
| `GET`  | `/events/:id `        | Finds event by id    |
| `POST` | `/event `             | Creates new event    |
| `PUT`  | `/event/:id `         | Updates event by id  |
| `POST` | `/api/webhooks/jiter` | Handles your payload |
