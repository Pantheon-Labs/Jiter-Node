import * as dotenv from 'dotenv';
import express from 'express';
import Jiter from '@jiter/node';
import { api } from './api';

dotenv.config();

const app = express();
const port = 8000;

export const init = (async () => {
  // See https://docs.jiter.dev/docs/getting-started
  Jiter.init({ apiKey: `${process.env.JITER_API_KEY}` });

  app.use(express.json());

  app.get('/', (req, res) =>
    res.json({
      message:
        'Welcome to the Jiter & Express TS example, checkout the /events and /webhooks endpoints!',
    }),
  );

  app.use('/api', api);

  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
})();
