import type { NextFunction, Request } from 'express';

export type WebhookHandlerOptions = {
  parse: false;
  overrides?: {
    encryption?: boolean;
  };
};

export type WebhookHandlerWithParsingOptions = {
  parse: true;
} & Omit<WebhookHandlerOptions, 'parse'>;

export type JiterEventObjectPayload = Record<any, any>;
export type JiterEventStringPayload = string;
export type JiterEventPayload = JiterEventObjectPayload | JiterEventStringPayload;

export type JiterWebhookEvent<T extends JiterEventPayload = Record<string, any>> = {
  req: Request;
  scheduledTime: Date;
  payload: T;
  next: NextFunction;
};

export type WebhookHandlerParsedCallback<T extends JiterEventObjectPayload> = (
  event: JiterWebhookEvent<T>,
) => Promise<void> | void;

export type WebhookHandlerCallback = (event: JiterWebhookEvent<string>) => Promise<void> | void;

export type WebhookHandlerArgs<T extends JiterEventObjectPayload = never> =
  | [WebhookHandlerParsedCallback<T>, WebhookHandlerWithParsingOptions]
  | [WebhookHandlerCallback, WebhookHandlerOptions]
  | [WebhookHandlerCallback];
