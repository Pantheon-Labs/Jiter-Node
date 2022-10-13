# Express + TypeScript example integration

1. Install dependencies via `yarn` or `npm install`
2. Run `npm run build` or `yarn build`
3. Get your [API keys and signing secret](https://docs.jiter.dev/docs/getting-started)
4. Run via `yarn start` or `yarn start:dev` (watch mode)
5. Example API is running on localhost:8000

Available routes:

```
GET     /api/events    finds all events
GET     /events/:id    finds event by id
POST    /event         creates new event
PUT     /event/:id     updates event by id
```

```
POST     /api/webhooks/jiter    handles your payload
```
