import type { AxiosStatic } from 'axios';
import { getJiterConfig } from '../src/config';
import { JiterConfigInstance } from '../src/types/config';
import { getMock } from './testUtils/getMock';

jest.mock('../src/config.ts');
const getJiterConfigMock = getMock(getJiterConfig);

const mockConfig: JiterConfigInstance = {
  apiKey: 'waffles',
  signingSecret: 'pancakes',
  timeout: 1337,
  baseUrl: 'outer space',
  millisecondsUntilWebhookExpiration: 1000,
};

describe('axios instance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with the correct config values', () => {
    jest.isolateModules(() => {
      const axios: AxiosStatic = require('axios');
      const axiosCreateSpy = jest.spyOn(axios, 'create');
      const { getAxios } = jest.requireActual('../src/axios.ts');

      getJiterConfigMock.mockReturnValueOnce(mockConfig);

      getAxios();

      expect(getJiterConfigMock).toHaveBeenCalledTimes(1);
      expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
      expect(axiosCreateSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: mockConfig.baseUrl,
          timeout: mockConfig.timeout,
          headers: {
            'x-api-key': mockConfig.apiKey,
          },
        }),
      );
    });
  });

  it('uses a cached instance when possible', () => {
    jest.isolateModules(() => {
      const axios: AxiosStatic = require('axios');
      const axiosCreateSpy = jest.spyOn(axios, 'create');
      const { getAxios } = jest.requireActual('../src/axios.ts');

      getJiterConfigMock.mockReturnValueOnce(mockConfig);

      const instanceOne = getAxios();
      const instanceTwo = getAxios();

      expect(instanceOne).toBe(instanceTwo);
      expect(getJiterConfigMock).toHaveBeenCalledTimes(1);
      expect(axiosCreateSpy).toHaveBeenCalledTimes(1);
    });
  });
});
