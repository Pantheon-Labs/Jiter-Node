export type OverrideJiterConfigOptions = {
  /**
   * @default {@link DEFAULT_URL}
   */
  baseUrl?: string;

  /**
   * The amount of milliseconds allowed between when a webhook event is sent and received before it becomes stale
   *
   * This value is used to help prevent Replay Attacks
   *
   * @default {@link DEFAULT_WEBHOOK_EXPIRATION_MILLISECONDS}
   */
  millisecondsUntilWebhookExpiration?: number;
};

export type JiterConfigOptions = {
  /**
   * @default {@link DEFAULT_TIMEOUT}
   */
  timeout?: number;
};

export type JiterConfig = {
  /**
   * The API Key for your given org. Go to {@link https://app.jiter.dev/} to find your API Key
   */
  apiKey: string;

  /**
   * The secret text used to verify that the request originated from Jiter instead of a third party.
   *
   * Go to {@link https://app.jiter.dev/} to find your Signing Secret
   */
  signingSecret: string;
} & JiterConfigOptions;

export type JiterConfigInstance = Required<JiterConfig & OverrideJiterConfigOptions>;
