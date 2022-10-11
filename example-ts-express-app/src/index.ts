import * as dotenv from 'dotenv';
import express, { Router } from 'express';
import Jiter from '@jiter/node';
import { eventsRouter } from './controllers/events';
import { webhooks } from './webhooks';

dotenv.config();

const app = express();
const port = 8000;

export const init = (async () => {
  Jiter.init({ apiKey: `${process.env.JITER_API_KEY}`, baseUrl: 'https://stage.jiter.dev/api' });
  const api = Router();
  app.use(express.json());
  api.use('/events', eventsRouter);
  api.use('/webhooks', webhooks);
  app.use('/api', api);

  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
})();
