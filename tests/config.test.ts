import { JiterInit } from '../src/config';
import { DEFAULT_TIMEOUT, DEFAULT_URL } from '../src/consts';
import { JiterConfigInstance } from '../src/types/config';

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

    it('throws if an api key is not provided', () => {
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
