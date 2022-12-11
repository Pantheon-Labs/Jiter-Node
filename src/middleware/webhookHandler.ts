import type { Handler } from 'express';
import { getJiterConfig } from '../config';
import { REQUEST_TIMESTAMP_HEADER, SIGNATURE_HEADER } from '../consts';
import {
  WebhookHandlerCallback,
  WebhookHandlerOptions,
  WebhookHandlerWithParsingOptions,
  JiterEventObjectPayload,
  WebhookHandlerParsedCallback,
  WebhookHandlerArgs,
} from '../types';
import { decrypt, signatureIsValid } from '../utils';

function isParsed<T extends JiterEventObjectPayload>(
  callback: WebhookHandlerArgs<T>[0],
  options?: WebhookHandlerArgs<T>[1],
): callback is WebhookHandlerParsedCallback<T> {
  return options?.parse === true;
}

interface WebhookHandler {
  <T extends JiterEventObjectPayload>(
    callback: WebhookHandlerParsedCallback<T>,
    options: WebhookHandlerWithParsingOptions,
  ): Handler;
  (callback: WebhookHandlerCallback, options: WebhookHandlerOptions): Handler;
  (callback: WebhookHandlerCallback): Handler;
}

export const webhookHandler: WebhookHandler =
  <T extends JiterEventObjectPayload = never>(...args: WebhookHandlerArgs<T>): Handler =>
  (req, res, next) => {
    const [callback, options] = args;

    const signature = req.header(SIGNATURE_HEADER);
    const requestTimestamp = req.header(REQUEST_TIMESTAMP_HEADER);

    if (!signature || !requestTimestamp) {
      res.sendStatus(401);
      return;
    }

    let rawPayload = req.body.payload as string;
    const rawScheduledTime = req.body.scheduledTime as string;

    const isValid = signatureIsValid({ signature, requestTimestamp, body: req.body });
    if (!isValid) {
      res.sendStatus(401);
      return;
    }

    if (!options?.disableEncryption) {
      const config = getJiterConfig();

      if (config.encryption) {
        try {
          rawPayload = decrypt(rawPayload);
        } catch (err) {
          res.sendStatus(500);
          return;
        }
      }
    }

    res.sendStatus(200);

    const scheduledTime = new Date(rawScheduledTime);
    if (isParsed(callback, options)) {
      try {
        const payload = JSON.parse(rawPayload);
        void callback({ payload, scheduledTime, req, next });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to parse Jiter event payload: ', error);
      }
      return;
    }

    void callback({ payload: rawPayload, scheduledTime, req, next });
  };
