import { createHmac } from 'crypto';
import { getJiterConfig } from '../config';

type SignatureIsValidArgs = {
  signature: string;
  requestTimestamp: string;
  body: string | Record<any, any>;
};

export const signatureIsValid: (args: SignatureIsValidArgs) => boolean = ({
  signature: requestSignature,
  requestTimestamp,
  body: rawBody,
}) => {
  const { signingSecret, millisecondsUntilWebhookExpiration } = getJiterConfig();
  const body = typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody);

  const timeSinceRequest = Math.abs(Date.now() - Number(requestTimestamp));
  if (Number.isNaN(timeSinceRequest))
    throw new Error('Invalid request timestamp; request timestamp must be a valid number');

  const isExpired = timeSinceRequest > millisecondsUntilWebhookExpiration;
  if (isExpired) throw new Error('Expired request; time since request since request exceeds limit');

  if (!body.trim()) throw new Error('Invalid body; body cannot be empty');
  if (!requestSignature.trim()) throw new Error('Invalid signature; signature cannot be empty');

  const baseString = `${requestTimestamp}:${body}`;
  const localSignature = createHmac('sha256', signingSecret).update(baseString).digest('base64');

  return requestSignature === localSignature;
};
