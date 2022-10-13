import { createHmac } from 'crypto';
import { JiterConfig, signatureIsValid } from '../../src';
import { getJiterConfig } from '../../src/config';
import { getMock } from '../testUtils/getMock';

const signingSecret = 'super strong secret sentence';
const createSignature = (text: string) =>
  createHmac('sha256', signingSecret).update(text).digest('base64');

const mockBody = {
  bestFood: 'waffles',
  bestAnimal: 'dog',
  programmingLanguages: ['TypeScript', 'JavaScript', 'others'],
};

jest.mock('../../src/config.ts');
const mockGetConfig = getMock(getJiterConfig);
const mockConfig: Pick<JiterConfig, 'signingSecret'> = { signingSecret };
mockGetConfig.mockReturnValue(mockConfig as any);

describe('signatureIsValid util method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns true for a valid signature when the body is a string', () => {
    const body = JSON.stringify(mockBody);
    const signature = createSignature(body);
    const isValid = signatureIsValid({ body, signature });
    expect(isValid).toEqual(true);
  });

  it('returns true for a valid signature when the body is an object', () => {
    const signature = createSignature(JSON.stringify(mockBody));
    const isValid = signatureIsValid({ body: mockBody, signature });
    expect(isValid).toEqual(true);
  });

  it('returns false for an invalid signature', () => {
    const signature = 'all your request are belong to us';
    const isValid = signatureIsValid({ body: mockBody, signature });
    expect(isValid).toEqual(false);
  });

  it('throws an error when when the body is empty', () => {
    expect(() => signatureIsValid({ body: '  ', signature: 'totally legit' })).toThrowError(
      new Error('Invalid body; body cannot be empty'),
    );
  });

  it('throws an error when when the signature is empty', () => {
    expect(() => signatureIsValid({ body: 'totally legit', signature: '  ' })).toThrowError(
      new Error('Invalid signature; signature cannot be empty'),
    );
  });
});
