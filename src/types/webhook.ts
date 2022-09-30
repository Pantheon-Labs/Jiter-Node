import type { Request } from 'express';

export type WebhookHandlerOptions = {
  parse: false;
};

export type WebhookHandlerWithParsingOptions = {
  parse: true;
} & Omit<WebhookHandlerOptions, 'parse'>;

export type JiterEventObjectPayload = Record<any, any>;
export type JiterEventStringPayload = string;
export type JiterEventPayload = JiterEventObjectPayload | JiterEventStringPayload;

export type JiterWebhookEvent<T extends JiterEventPayload> = {
  req: Request;
  scheduledTime: Date;
  payload: T;
};

export type WebhookHandlerParsedCallback<T extends JiterEventObjectPayload> = (
  event: JiterWebhookEvent<T>,
) => Promise<void> | void;

export type WebhookHandlerCallback = (event: JiterWebhookEvent<string>) => Promise<void> | void;

export type WebhookHandlerArgs<T extends JiterEventObjectPayload = never> =
  | [WebhookHandlerParsedCallback<T>, WebhookHandlerWithParsingOptions]
  | [WebhookHandlerCallback, WebhookHandlerOptions]
  | [WebhookHandlerCallback];
