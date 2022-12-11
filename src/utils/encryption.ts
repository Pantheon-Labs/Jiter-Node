import crypto from 'crypto';
import { getJiterConfig } from '../config';

export const encrypt = (str: string): string => {
  const config = getJiterConfig();
  if (!config.encryption) throw new Error('Encryption Not Enabled');

  const lastKey = config.encryption.keys.at(-1);
  if (!lastKey) throw new Error('Missing Encryption Keys');

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', lastKey.key, iv);

  const encryptedPayload = cipher.update(str, 'utf8', 'hex') + cipher.final('hex');

  return Buffer.from(
    [lastKey.id, iv.toString('hex'), cipher.getAuthTag().toString('hex'), encryptedPayload].join(
      ':',
    ),
  ).toString('base64');
};

export const decrypt = (encrypted: string): string => {
  const config = getJiterConfig();
  if (!config.encryption) return encrypted;

  const [id, iv, authTag, encryptedPayload] = Buffer.from(encrypted, 'base64')
    .toString('utf8')
    .split(':');

  const decryptionKey = config.encryption.keys.find((k) => k.id === id);
  if (!decryptionKey) throw new Error(`Missing Encryption Key: ${id}`);

  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    decryptionKey.key,
    Buffer.from(iv, 'hex'),
  );

  decipher.setAuthTag(Buffer.from(authTag, 'hex'));

  return decipher.update(encryptedPayload, 'hex', 'utf8') + decipher.final('utf8');
};
