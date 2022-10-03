export type OverrideJiterConfigOptions = {
  /**
   * @default {@link DEFAULT_URL}
   */
  baseUrl?: string;
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
} & JiterConfigOptions;

export type JiterConfigInstance = Required<JiterConfig & OverrideJiterConfigOptions>;
