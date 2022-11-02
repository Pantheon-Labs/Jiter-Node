/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import express from 'express';
import Jiter from '@jiter/node';
import { api } from './api';

dotenv.config();

const app = express();
app.use(express.json());

const port = 8000;

// See https://docs.jiter.dev/docs/getting-started
try {
  Jiter.init({
    apiKey: process.env.JITER_API_KEY ?? '',
    signingSecret: process.env.JITER_SIGNING_SECRET ?? '',
  });
} catch (err) {
  console.error(err);
  console.info(
    '\n\n🚨 Looks like Jiter failed to initialize; have you followed the setup steps in the README?\n\n',
  );
  process.exit();
}

app.get('/', (req, res) =>
  res.json({
    message:
      'Welcome to the Jiter & Express TS example, checkout the /events and /webhooks endpoints!',
  }),
);

app.use('/api', api);

app.listen(port, () => {
  console.log(`\n\n🚀 Server started at http://localhost:${port}`);
});
