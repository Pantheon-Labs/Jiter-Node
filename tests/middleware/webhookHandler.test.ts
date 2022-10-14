import { Request, Response } from 'express';
import { JiterWebhookEvent } from '../../src';
import { getJiterConfig } from '../../src/config';
import {
  DEFAULT_WEBHOOK_EXPIRATION_MILLISECONDS,
  REQUEST_TIMESTAMP_HEADER,
  SIGNATURE_HEADER,
} from '../../src/consts';
import { webhookHandler } from '../../src/middleware/webhookHandler';
import { JiterConfigInstance } from '../../src/types/config';
import { signatureIsValid } from '../../src/utils/signatureIsValid';
import { getMock } from '../testUtils/getMock';

const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());

jest.mock('../../src/utils/signatureIsValid');
const mockSignatureIsValid = getMock(signatureIsValid);
mockSignatureIsValid.mockReturnValue(true);

jest.mock('../../src/config.ts');
const mockGetJiterConfig = getMock(getJiterConfig);
const mockConfig: Pick<JiterConfigInstance, 'millisecondsUntilWebhookExpiration'> = {
  millisecondsUntilWebhookExpiration: DEFAULT_WEBHOOK_EXPIRATION_MILLISECONDS,
};
mockGetJiterConfig.mockReturnValue(mockConfig as JiterConfigInstance);

const mockRes: Pick<Response, 'sendStatus'> = {
  sendStatus: jest.fn(),
};

const mockNext = jest.fn();

type MockRequest = Pick<Request, 'header' | 'body'>;
const mockSignature = 'this payload is totally legit';
const mockRequestTimestamp = new Date().getTime();
const mockHeaderMethod = jest
  .fn()
  .mockImplementation((header) =>
    header === SIGNATURE_HEADER ? mockSignature : String(mockRequestTimestamp),
  );

describe('validateWebhook middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uses the appropriate header and returns a next method as part of the callback', () => {
    const mockReq: MockRequest = {
      body: {},
      header: mockHeaderMethod,
    };
    webhookHandler(({ next }) => {
      expect(next).toBe(mockNext);
    })(mockReq as Request, mockRes as Response, mockNext);
    expect(mockHeaderMethod).toBeCalledTimes(2);
    expect(mockHeaderMethod).toBeCalledWith(SIGNATURE_HEADER);
    expect(mockHeaderMethod).toBeCalledWith(REQUEST_TIMESTAMP_HEADER);
  });

  it('returns a 401 status if signature was not provided', () => {
    const mockReq: MockRequest = {
      body: {},
      header: mockHeaderMethod,
    };
    mockHeaderMethod.mockReturnValueOnce(undefined);

    const mockCallback = jest.fn();
    webhookHandler(mockCallback)(mockReq as Request, mockRes as Response, mockNext);

    expect(mockCallback).not.toBeCalled();
    expect(mockRes.sendStatus).toBeCalledTimes(1);
    expect(mockRes.sendStatus).toBeCalledWith(401);
  });

  it('returns a 401 status if the signature is invalid', () => {
    const mockReq: MockRequest = {
      body: {},
      header: mockHeaderMethod,
    };

    mockSignatureIsValid.mockReturnValueOnce(false);

    const mockCallback = jest.fn();
    webhookHandler(mockCallback)(mockReq as Request, mockRes as Response, mockNext);

    expect(mockCallback).not.toBeCalled();
    expect(mockRes.sendStatus).toBeCalledTimes(1);
    expect(mockRes.sendStatus).toBeCalledWith(401);
  });

  it('returns a 200 status if the signature is valid', () => {
    const mockReq: MockRequest = {
      body: {},
      header: mockHeaderMethod,
    };

    const mockCallback = jest.fn();
    webhookHandler(mockCallback)(mockReq as Request, mockRes as Response, mockNext);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockRes.sendStatus).toBeCalledTimes(1);
    expect(mockRes.sendStatus).toBeCalledWith(200);
  });

  describe('response variations', () => {
    it('parses the payload when the parse option is set and returns a date object for scheduledTime', () => {
      const mockPayload = { testingIsFun: 'sometimes' };
      const mockReq: MockRequest = {
        body: {
          payload: JSON.stringify(mockPayload),
          scheduledTime: new Date().toISOString(),
        },
        header: mockHeaderMethod,
      };

      const mockCallback = jest.fn();
      webhookHandler(mockCallback, { parse: true })(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );

      expect(mockCallback).toBeCalledTimes(1);
      const event: JiterWebhookEvent = mockCallback.mock.calls[0][0];
      expect(typeof event.payload).toEqual('object');
      expect(event.payload).toEqual(mockPayload);
      expect(typeof event.scheduledTime).toEqual('object');
    });

    it('does not parse the payload unless specified', () => {
      const payload = 'this payload is just a string';
      const mockReq: MockRequest = {
        body: {
          payload,
          scheduledTime: new Date().toISOString(),
        },
        header: mockHeaderMethod,
      };

      const mockCallback = jest.fn();
      webhookHandler(mockCallback)(mockReq as Request, mockRes as Response, mockNext);

      expect(mockCallback).toBeCalledTimes(1);
      const event: JiterWebhookEvent = mockCallback.mock.calls[0][0];
      expect(typeof event.payload).toEqual('string');
      expect(event.payload).toEqual(payload);
      expect(typeof event.scheduledTime).toEqual('object');
    });

    it('logs an error when the parse option is set but the payload is not valid JSON', () => {
      const payload = 'this is not JSON';
      const mockReq: MockRequest = {
        body: {
          payload,
          scheduledTime: new Date().toISOString(),
        },
        header: mockHeaderMethod,
      };

      const mockCallback = jest.fn();
      webhookHandler(mockCallback, { parse: true })(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );

      expect(mockCallback).not.toBeCalled();
      expect(consoleErrorSpy).toBeCalledTimes(1);
      expect(consoleErrorSpy).toBeCalledWith(
        'Failed to parse Jiter event payload: ',
        expect.anything(),
      );
    });
  });
});
