import { AxiosRequestTransformer } from 'axios';
import Jiter, { BaseEvent, encrypt } from '../../src';
import { eventsPath } from '../../src/events/consts';
import { mockGetAxios } from '../testUtils/getAxiosMock';
import { getMock } from '../testUtils/getMock';
import { getJiterConfig } from '../../src/config';

jest.mock('../../src/config.ts');
const getJiterConfigMock = getMock(getJiterConfig);

jest.mock('../../src/utils/encryption.ts');
const encryptMock = getMock(encrypt);

const getAxiosMock = mockGetAxios();

getJiterConfigMock.mockReturnValue({
  apiKey: 'api-key',
  baseUrl: 'base-url',
  signingSecret: 'signing-secret',
  millisecondsUntilWebhookExpiration: 0,
  timeout: 0,
  encryption: {
    keys: [],
  },
});

describe('Events.createEvent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates an event in an hour', async () => {
    const mockData: Partial<BaseEvent> = { id: 'hello world' };
    getAxiosMock.post.mockReturnValueOnce({ data: mockData });

    const createEventOptions = {
      payload: 'beep',
      scheduledTime: new Date(Date.now() + 800).toISOString(),
      destination: 'https://your.app/webhooks',
    };
    const response = await Jiter.Events.createEvent(createEventOptions);

    expect(getAxiosMock.post).toHaveBeenCalledTimes(1);
    expect(getAxiosMock.post).toHaveBeenCalledWith(
      eventsPath,
      expect.objectContaining({ ...createEventOptions }),
      expect.objectContaining({ transformRequest: expect.any(Function) }),
    );
    expect(response).toBe(mockData);
  });

  it('creates an event with the encrypt utility', async () => {
    const mockData: Partial<BaseEvent> = { id: 'hello world' };
    getAxiosMock.post.mockReturnValueOnce({ data: mockData });

    const createEventOptions = {
      payload: 'beep',
      scheduledTime: new Date(Date.now() + 800).toISOString(),
      destination: 'https://your.app/webhooks',
    };
    await Jiter.Events.createEvent(createEventOptions);

    expect(getAxiosMock.post).toHaveBeenCalledTimes(1);
    expect(getAxiosMock.post).toHaveBeenCalledWith(
      eventsPath,
      expect.objectContaining({ ...createEventOptions }),
      expect.objectContaining({ transformRequest: expect.any(Function) }),
    );

    const transformRequest = getAxiosMock.post.mock.lastCall![2]!
      .transformRequest as AxiosRequestTransformer;

    const mockEncryptedPayload = 'encrypted';
    encryptMock.mockReturnValue(mockEncryptedPayload);
    const { payload: encryptedPayload } = transformRequest(createEventOptions);

    expect(encryptMock).toHaveBeenCalledWith(createEventOptions.payload);
    expect(encryptedPayload).toEqual(mockEncryptedPayload);
  });

  it('skips encryption if encryption is disabled in the config', async () => {
    getJiterConfigMock.mockReturnValue({
      apiKey: 'api-key',
      baseUrl: 'base-url',
      signingSecret: 'signing-secret',
      millisecondsUntilWebhookExpiration: 0,
      timeout: 0,
      encryption: null,
    });

    const mockData: Partial<BaseEvent> = { id: 'hello world' };
    getAxiosMock.post.mockReturnValueOnce({ data: mockData });

    const createEventOptions = {
      payload: 'beep',
      scheduledTime: new Date(Date.now() + 800).toISOString(),
      destination: 'https://your.app/webhooks',
    };
    await Jiter.Events.createEvent(createEventOptions);

    expect(getAxiosMock.post).toHaveBeenCalledTimes(1);
    expect(getAxiosMock.post).toHaveBeenCalledWith(
      eventsPath,
      expect.objectContaining({ ...createEventOptions }),
      expect.objectContaining({ transformRequest: expect.any(Function) }),
    );

    const transformRequest = getAxiosMock.post.mock.lastCall![2]!
      .transformRequest as AxiosRequestTransformer;

    const mockEncryptedPayload = 'encrypted';
    encryptMock.mockReturnValue(mockEncryptedPayload);
    const transformedData = transformRequest(createEventOptions);

    expect(encryptMock).not.toHaveBeenCalled();
    expect(transformedData).toBe(createEventOptions);
  });

  it('skips encryption if the option disableEncryption is true', async () => {
    const mockData: Partial<BaseEvent> = { id: 'hello world' };
    getAxiosMock.post.mockReturnValueOnce({ data: mockData });

    const createEventOptions = {
      payload: 'beep',
      scheduledTime: new Date(Date.now() + 800).toISOString(),
      destination: 'https://your.app/webhooks',
    };
    await Jiter.Events.createEvent({ ...createEventOptions, disableEncryption: true });

    expect(getAxiosMock.post).toHaveBeenCalledTimes(1);
    expect(getAxiosMock.post).toHaveBeenCalledWith(
      eventsPath,
      expect.objectContaining({ ...createEventOptions }),
      expect.objectContaining({ transformRequest: expect.any(Function) }),
    );

    const transformRequest = getAxiosMock.post.mock.lastCall![2]!
      .transformRequest as AxiosRequestTransformer;

    const mockEncryptedPayload = 'encrypted';
    encryptMock.mockReturnValue(mockEncryptedPayload);
    const transformedData = transformRequest(createEventOptions);

    expect(encryptMock).not.toHaveBeenCalled();
    expect(transformedData).toBe(createEventOptions);
  });
});
