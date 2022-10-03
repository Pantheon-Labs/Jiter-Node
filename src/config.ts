import { DEFAULT_TIMEOUT, DEFAULT_URL } from './consts';

interface DefaultJiterConfigOptions {
  /**
   * @default {@link DEFAULT_URL}
   */
  defaultUrl?: string;
  /**
   * @default {@link DEFAULT_TIMEOUT}
   */
  defaultTimeout?: number;
}

const defaultConfigOptions: Required<DefaultJiterConfigOptions> = {
  defaultUrl: DEFAULT_URL,
  defaultTimeout: DEFAULT_TIMEOUT,
};

interface JiterConfigOptions extends Partial<DefaultJiterConfigOptions> {
  /**
   * The API Key for your given org. Go to {@link https://app.jiter.dev/} to find your API Key
   */
  apiKey: string;
}

let JiterConfig: JiterConfigOptions = { ...defaultConfigOptions, apiKey: 'NOT_SET' };

/**
 * Initializes the Jiter SDK
 */
export const JiterInit = (jiterConfigOptions: JiterConfigOptions) => {
  console.log(`Jiter COnfig options`, jiterConfigOptions);
  JiterConfig = { ...defaultConfigOptions, ...jiterConfigOptions };
  console.log(`Jiter Config`, JiterConfig);
  if (!JiterConfig.apiKey) throw new Error('Invalid API key');
};

export const getJiterConfig = () => JiterConfig;
