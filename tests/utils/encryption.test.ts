import crypto from 'crypto';
import { getJiterConfig } from '../../src/config';
import { JiterConfigInstance } from '../../src/types/config';
import { encrypt, decrypt } from '../../src/utils/encryption';
import { getMock } from '../testUtils/getMock';

jest.mock('../../src/config.ts');
const getJiterConfigMock = getMock(getJiterConfig);

const mockConfigBase: Omit<JiterConfigInstance, 'encryption'> = {
  apiKey: 'api-key',
  baseUrl: 'base-url',
  signingSecret: 'signing-secret',
  millisecondsUntilWebhookExpiration: 0,
  timeout: 0,
};

/** Encryption Test Notes
 * All of these are real values, do not change them! If they are changed they must be generated with the Crypto library again so that the encryption/decryption tests function correctly
 */
const mockRandomBytes = '84259b23b50b952191d3c66c';
const input = 'hello world';
const encryptionKeyId = 'one';
const encryptionKey = 'b61f10a074d9092284bab6b0e89a166886540b9156f590e1a20d274f57f5482a';
const encryptedPayload =
  'b25lOjg0MjU5YjIzYjUwYjk1MjE5MWQzYzY2YzphNWM1ZjUzNTY3NzU2NzI5NDFiZDkzZTdlMTNjYTQ2MzplMzhiY2YyZWZhYjRiMDdlOWVhYzRi';

jest.spyOn(crypto, 'randomBytes').mockImplementation(() => Buffer.from(mockRandomBytes, 'hex'));

describe('Encryption Utils', () => {
  it('encrypt throws if encryption is not enabled', async () => {
    getJiterConfigMock.mockReturnValue(mockConfigBase);

    expect(() => encrypt(input)).toThrow('Encryption Not Enabled');
  });

  it('encrypt throws if there are no encryption keys', async () => {
    getJiterConfigMock.mockReturnValue({
      ...mockConfigBase,
      encryption: {
        keys: [],
      },
    });

    expect(() => encrypt('hello world')).toThrow('Missing Encryption Keys');
  });

  it('encrypt returns the encrypted string encoded as base64', () => {
    getJiterConfigMock.mockReturnValue({
      ...mockConfigBase,
      encryption: {
        keys: [
          {
            id: encryptionKeyId,
            key: Buffer.from(encryptionKey, 'hex'),
          },
        ],
      },
    });

    expect(encrypt(input)).toEqual(encryptedPayload);
  });

  it('decrypt returns the input if encryption is not enabled', () => {
    getJiterConfigMock.mockReturnValue(mockConfigBase);

    expect(decrypt(input)).toEqual(input);
  });

  it('decrypt throws if the encryption key is missing', () => {
    getJiterConfigMock.mockReturnValue({
      ...mockConfigBase,
      encryption: {
        keys: [],
      },
    });

    expect(() => decrypt(encryptedPayload)).toThrow(`Missing Encryption Key: ${encryptionKeyId}`);
  });

  it('decrypt returns the decrypted string', () => {
    getJiterConfigMock.mockReturnValue({
      ...mockConfigBase,
      encryption: {
        keys: [
          {
            id: encryptionKeyId,
            key: Buffer.from(encryptionKey, 'hex'),
          },
        ],
      },
    });

    expect(decrypt(encryptedPayload)).toEqual(input);
  });
});
