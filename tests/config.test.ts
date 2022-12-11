import { JiterInit } from '../src/config';
import { DEFAULT_TIMEOUT, DEFAULT_URL } from '../src/consts';
import { EncryptionOptions, JiterConfigInstance } from '../src/types/config';

type ConfigModule = {
  init: JiterInit;
  getJiterConfig: () => JiterConfigInstance;
};

describe('config', () => {
  describe('init', () => {
    it('uses default values when optional values are not provided', () => {
      jest.isolateModules(() => {
        const { init, getJiterConfig } = require('../src/config') as ConfigModule;

        const apiKey = 'no hax pls';
        const signingSecret = 'seriously, pls no hax';
        init({ apiKey, signingSecret });

        const config = getJiterConfig();
        expect(config.apiKey).toEqual(apiKey);
        expect(config.signingSecret).toEqual(signingSecret);
        expect(config.baseUrl).toEqual(DEFAULT_URL);
        expect(config.timeout).toEqual(DEFAULT_TIMEOUT);
      });
    });

    it('throws if an api key is not provided', () => {
      jest.isolateModules(() => {
        const { init } = require('../src/config');
        expect(() => init({ apiKey: undefined })).toThrow('Invalid API Key');
      });
    });

    it('throws if a signing secret is not provided', () => {
      jest.isolateModules(() => {
        const { init } = require('../src/config');
        expect(() => init({ apiKey: 'come on in' })).toThrow('Invalid Signing Secret');
      });
    });

    it('throws if an api key is just whitespace', () => {
      jest.isolateModules(() => {
        const { init } = require('../src/config') as ConfigModule;
        expect(() => init({ apiKey: '       ', signingSecret: 'maple' })).toThrow(
          'Invalid API Key',
        );
      });
    });

    it('throws if an signing secret is just whitespace', () => {
      jest.isolateModules(() => {
        const { init } = require('../src/config') as ConfigModule;
        expect(() => init({ apiKey: 'syrup', signingSecret: '       ' })).toThrow(
          'Invalid Signing Secret',
        );
      });
    });

    it('allows for override values', () => {
      jest.isolateModules(() => {
        const { init, getJiterConfig } = require('../src/config') as ConfigModule;

        const apiKey = 'no hax pls';
        const signingSecret = 'no hax pls x2';
        const overrideBaseUrl = 'seriously, no hax pls';
        const overrideTimeout = 1337;
        init({ apiKey, signingSecret, baseUrl: overrideBaseUrl, timeout: overrideTimeout });

        const config = getJiterConfig();
        expect(config.apiKey).toEqual(apiKey);
        expect(config.signingSecret).toEqual(signingSecret);
        expect(config.baseUrl).toEqual(overrideBaseUrl);
        expect(config.timeout).toEqual(overrideTimeout);
      });
    });

    it('throws if an empty array is passed for encryption keys', () => {
      jest.isolateModules(() => {
        const { init } = require('../src/config') as ConfigModule;

        const apiKey = 'no hax pls';
        const signingSecret = 'seriously, no hax pls';
        const encryptionOptions: EncryptionOptions = {
          keys: [],
        };

        expect(() => init({ apiKey, signingSecret, encryption: encryptionOptions })).toThrow(
          'Missing Encryption Keys',
        );
      });
    });

    it('throws if there are duplicate encryption key ids', () => {
      jest.isolateModules(() => {
        const { init } = require('../src/config') as ConfigModule;

        const apiKey = 'no hax pls';
        const signingSecret = 'seriously, no hax pls';
        const encryptionOptions: EncryptionOptions = {
          keys: [
            {
              id: 'one',
              key: 'b61f10a074d9092284bab6b0e89a166886540b9156f590e1a20d274f57f5482a',
            },
            {
              id: 'one',
              key: '9c4536d376e92631fdebc0a376461b37e974c05d82613f48d302b15854f7e461',
            },
          ],
        };

        expect(() => init({ apiKey, signingSecret, encryption: encryptionOptions })).toThrow(
          'Duplicate Key ID: one',
        );
      });
    });

    it('throws if an encryption key is not 32 bytes', () => {
      jest.isolateModules(() => {
        const { init } = require('../src/config') as ConfigModule;

        const apiKey = 'no hax pls';
        const signingSecret = 'seriously, no hax pls';
        const encryptionOptions: EncryptionOptions = {
          keys: [
            {
              id: 'one',
              key: 'abc',
            },
          ],
        };

        expect(() => init({ apiKey, signingSecret, encryption: encryptionOptions })).toThrow(
          'Invalid Key Length',
        );
      });
    });

    it('converts 32 byte hex keys into buffers correctly', () => {
      jest.isolateModules(() => {
        const { init, getJiterConfig } = require('../src/config') as ConfigModule;

        const apiKey = 'no hax pls';
        const signingSecret = 'seriously, no hax pls';
        const encryptionOptions: EncryptionOptions = {
          keys: [
            {
              id: 'one',
              key: 'b61f10a074d9092284bab6b0e89a166886540b9156f590e1a20d274f57f5482a',
            },
            {
              id: 'two',
              key: '9c4536d376e92631fdebc0a376461b37e974c05d82613f48d302b15854f7e461',
            },
          ],
        };

        init({ apiKey, signingSecret, encryption: encryptionOptions });

        const config = getJiterConfig();
        expect(config.encryption).toBeDefined();
        expect(config.encryption!.keys[0].key.toString('hex')).toEqual(
          encryptionOptions.keys[0].key,
        );
        expect(config.encryption!.keys[1].key.toString('hex')).toEqual(
          encryptionOptions.keys[1].key,
        );
      });
    });
  });

  describe('getJiterConfig', () => {
    it('throws if init has not been called', () => {
      jest.isolateModules(() => {
        const { getJiterConfig } = require('../src/config') as ConfigModule;

        expect(getJiterConfig).toThrow('Jiter is not initialized');
      });
    });

    it('uses a cached config if one exists', () => {
      jest.isolateModules(() => {
        const { init, getJiterConfig } = require('../src/config') as ConfigModule;
        init({ apiKey: 'let me in', signingSecret: 'password123' });

        const configOne = getJiterConfig();
        const configTwo = getJiterConfig();

        expect(configOne).toBe(configTwo);
      });
    });
  });
});
