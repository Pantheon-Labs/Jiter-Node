import crypto from 'crypto';
import { signatureIsValid } from '../../src';
import { getJiterConfig } from '../../src/config';
import { DEFAULT_WEBHOOK_EXPIRATION_MILLISECONDS } from '../../src/consts';
import { JiterConfigInstance } from '../../src/types/config';
import { getMock } from '../testUtils/getMock';

const { createHmac: originalCreateHmac } = jest.requireActual('crypto');

const signingSecret = 'super strong secret sentence';
const createSignature = (requestTimestamp: string | number, body: string) =>
  originalCreateHmac('sha256', signingSecret)
    .update(`${requestTimestamp}:${body}`)
    .digest('base64');

const mockBody = {
  bestFood: 'waffles',
  bestAnimal: 'dog',
  programmingLanguages: ['TypeScript', 'JavaScript', 'others'],
};

jest.mock('../../src/config.ts');
const mockGetConfig = getMock(getJiterConfig);
const mockConfig: Pick<
  JiterConfigInstance,
  'signingSecret' | 'millisecondsUntilWebhookExpiration'
> = {
  signingSecret,
  millisecondsUntilWebhookExpiration: DEFAULT_WEBHOOK_EXPIRATION_MILLISECONDS,
};
mockGetConfig.mockReturnValue(mockConfig as any);

const createHmacSpy = jest.spyOn(crypto, 'createHmac');

const dateNowSpy = jest.spyOn(Date, 'now');

describe('signatureIsValid util method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns true for a valid signature when the body is a string', () => {
    const requestTimestamp = Date.now().toString();
    dateNowSpy.mockReturnValueOnce(Number(requestTimestamp));
    const body = JSON.stringify(mockBody);
    const signature = createSignature(requestTimestamp, body);
    const isValid = signatureIsValid({ body, signature, requestTimestamp });
    expect(isValid).toEqual(true);
  });

  it('creates a local signature with the appropriate values when body is a string', () => {
    const requestTimestamp = Date.now().toString();
    dateNowSpy.mockReturnValueOnce(Number(requestTimestamp));
    const body = JSON.stringify(mockBody);
    const signature = createSignature(requestTimestamp, body);

    const mockHmac = {
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue(signature),
    };
    createHmacSpy.mockReturnValueOnce(mockHmac as any);

    const isValid = signatureIsValid({ body, signature, requestTimestamp });
    expect(isValid).toEqual(true);

    expect(createHmacSpy).toBeCalledTimes(1);
    expect(createHmacSpy).toHaveBeenCalledWith('sha256', signingSecret);

    expect(mockHmac.update).toHaveBeenCalledTimes(1);
    expect(mockHmac.update).toHaveBeenCalledWith(`${requestTimestamp}:${body}`);

    expect(mockHmac.digest).toHaveBeenCalledTimes(1);
    expect(mockHmac.digest).toHaveBeenCalledWith('base64');
  });

  it('returns true for a valid signature when the body is an object', () => {
    const requestTimestamp = Date.now().toString();
    dateNowSpy.mockReturnValueOnce(Number(requestTimestamp));
    const signature = createSignature(requestTimestamp, JSON.stringify(mockBody));
    const isValid = signatureIsValid({
      body: mockBody,
      signature,
      requestTimestamp,
    });
    expect(isValid).toEqual(true);
  });

  it('creates a local signature with the appropriate values when body is an object', () => {
    const requestTimestamp = Date.now().toString();
    dateNowSpy.mockReturnValueOnce(Number(requestTimestamp));
    const signature = createSignature(requestTimestamp, JSON.stringify(mockBody));

    const mockHmac = {
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue(signature),
    };
    createHmacSpy.mockReturnValueOnce(mockHmac as any);

    const isValid = signatureIsValid({
      body: mockBody,
      signature,
      requestTimestamp,
    });
    expect(isValid).toEqual(true);

    expect(createHmacSpy).toBeCalledTimes(1);
    expect(createHmacSpy).toHaveBeenCalledWith('sha256', signingSecret);

    expect(mockHmac.update).toHaveBeenCalledTimes(1);
    expect(mockHmac.update).toHaveBeenCalledWith(`${requestTimestamp}:${JSON.stringify(mockBody)}`);

    expect(mockHmac.digest).toHaveBeenCalledTimes(1);
    expect(mockHmac.digest).toHaveBeenCalledWith('base64');
  });

  it('returns false for an invalid signature', () => {
    const requestTimestamp = Date.now().toString();
    dateNowSpy.mockReturnValueOnce(Number(requestTimestamp));
    const signature = 'all your request are belong to us';
    const isValid = signatureIsValid({
      body: mockBody,
      signature,
      requestTimestamp,
    });
    expect(isValid).toEqual(false);
  });

  it('throws an error when when the request timestamp is not a valid number', () => {
    const requestTimestamp = undefined as unknown as string;

    expect(() =>
      signatureIsValid({
        body: mockBody,
        signature: 'this is fine',
        requestTimestamp,
      }),
    ).toThrowError(
      new Error('Invalid request timestamp; request timestamp must be a valid number'),
    );
  });

  it('throws an error when when the request timestamp is not a valid number', () => {
    const requestTimestamp = Date.now().toString();
    dateNowSpy.mockReturnValueOnce(
      Number(requestTimestamp) + DEFAULT_WEBHOOK_EXPIRATION_MILLISECONDS + 1,
    );

    expect(() =>
      signatureIsValid({
        body: mockBody,
        signature: 'this is fine',
        requestTimestamp,
      }),
    ).toThrowError(new Error('Expired request; time since request since request exceeds limit'));
  });

  it('throws an error when when the body is empty', () => {
    const requestTimestamp = Date.now().toString();
    expect(() =>
      signatureIsValid({
        body: '  ',
        signature: 'totally legit',
        requestTimestamp,
      }),
    ).toThrowError(new Error('Invalid body; body cannot be empty'));
  });

  it('throws an error when when the signature is empty', () => {
    const requestTimestamp = Date.now().toString();
    expect(() =>
      signatureIsValid({
        body: 'totally legit',
        signature: '  ',
        requestTimestamp,
      }),
    ).toThrowError(new Error('Invalid signature; signature cannot be empty'));
  });
});
