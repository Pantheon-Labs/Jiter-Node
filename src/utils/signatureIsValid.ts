import { createHmac } from 'crypto';
import { getJiterConfig } from '../config';

type SignatureIsValidArgs = {
  signature: string;
  body: string | Record<any, any>;
};

export const signatureIsValid: (args: SignatureIsValidArgs) => boolean = ({
  signature: requestSignature,
  body: rawBody,
}) => {
  const { signingSecret } = getJiterConfig();
  const body = typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody);

  if (!body.trim()) throw new Error('Invalid body; body cannot be empty');
  if (!requestSignature.trim()) throw new Error('Invalid signature; signature cannot be empty');

  const localSignature = createHmac('sha256', signingSecret).update(body).digest('base64');

  return requestSignature === localSignature;
};
