import type { Handler } from 'express';
import { SIGNATURE_HEADER } from '../consts';
import {
  WebhookHandlerCallback,
  WebhookHandlerOptions,
  WebhookHandlerWithParsingOptions,
  JiterEventObjectPayload,
  WebhookHandlerParsedCallback,
  WebhookHandlerArgs,
} from '../types';

function isParsed<T extends JiterEventObjectPayload>(
  callback: WebhookHandlerArgs<T>[0],
  options?: WebhookHandlerArgs<T>[1],
): callback is WebhookHandlerParsedCallback<T> {
  return options?.parse === true;
}

interface HandleWebhookFn {
  <T extends JiterEventObjectPayload>(
    callback: WebhookHandlerParsedCallback<T>,
    options: WebhookHandlerWithParsingOptions,
  ): Handler;
  (callback: WebhookHandlerCallback, options: WebhookHandlerOptions): Handler;
  (callback: WebhookHandlerCallback): Handler;
}

export const handleWebhook: HandleWebhookFn =
  <T extends JiterEventObjectPayload = never>(...args: WebhookHandlerArgs<T>): Handler =>
  (req, res) => {
    const [callback, options] = args;

    const signature = req.header(SIGNATURE_HEADER);
    const { payload: rawPayload, scheduledTime: rawScheduledTime } = req.body as Record<
      string,
      string
    >;

    // TODO: Validate signature
    const signatureIsValid = true;

    if (!signature || !signatureIsValid) {
      res.sendStatus(401);
      return;
    }

    res.sendStatus(200);

    const scheduledTime = new Date(rawScheduledTime);
    if (isParsed(callback, options)) {
      try {
        const payload = JSON.parse(rawPayload);
        callback({ payload, scheduledTime, req });
      } catch (error) {
        console.error('Failed to parse Jiter event payload: ', error);
      }
      console.log(options, callback);
      return;
    }
    console.log(options, callback);

    callback({ payload: rawPayload, scheduledTime, req });
  };

// type SomeEvent = {
//   thing: boolean;
//   otherThing: string;
// };

// type MyEvent = {
//   wat: boolean;
//   thing: 'yes';
// };

// const handler1 = handleWebhook<MyEvent>(
//   (event) => {
//     event.payload;
//   },
//   { parse: true },
// );
// const handler4 = handleWebhook<MyEvent>(
//   (event) => {
//     event.payload.thing;
//   },
//   { parse: true },
// );
// const handler2 = handleWebhook((event) => {
//   event.payload;
// });
// const handler3 = handleWebhook(
//   (event) => {
//     event.payload;
//   },
//   { parse: false },
// );
