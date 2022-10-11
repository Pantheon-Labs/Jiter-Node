import { Router } from 'express';
import { createHmac } from 'crypto';

export const jiterWebhookEvent = Router();

jiterWebhookEvent.post('/jiter', (req, res) => {
  const parsedPayload = JSON.parse(req.body.payload);
  const jiterSignature = req.header('Jiter-Signature');

  const mySignature = createHmac('sha256', `${process.env.JITER_SIGNING_SECRET}`)
    .update(req.body.payload)
    .digest('base64');

  if (jiterSignature !== mySignature) {
    res.sendStatus(401);
    return;
  }

  if (parsedPayload.action === 'buyGroceries') {
    console.log('Purchased the following groceries:', parsedPayload.values);
  }

  res.sendStatus(200);
});
