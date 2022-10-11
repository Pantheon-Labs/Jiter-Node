import { Router } from 'express';
import { jiterWebhookEvent } from './jiter';

export const webhooks = Router();

webhooks.use('/jiter', jiterWebhookEvent);
