import { DEFAULT_TIMEOUT, DEFAULT_URL } from './consts';

interface JiterInitOptions {
  /**
   * @default {@link DEFAULT_URL}
   */
  defaultUrl?: string;
  /**
   * @default {@link DEFAULT_TIMEOUT}
   */
  defaultTimeout?: number;
}

const defaultConfig: Required<JiterInitOptions> = {
  defaultUrl: DEFAULT_URL,
  defaultTimeout: DEFAULT_TIMEOUT,
};

let JiterConfig: Required<JiterInitOptions> = {
  defaultUrl: DEFAULT_URL,
  defaultTimeout: DEFAULT_TIMEOUT,
};

export const JiterInit = (JiterInitOptions: JiterInitOptions) => {
  JiterConfig = { ...defaultConfig, ...JiterInitOptions };
};

export const getJiterConfig = () => JiterConfig;
