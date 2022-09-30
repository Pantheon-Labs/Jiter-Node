import { DEFAULT_TIMEOUT, DEFAULT_URL } from './consts';

interface JiterInitProps {
  /**
   * @default {@link DEFAULT_URL}
   */
  defaultUrl?: string;
  /**
   * @default {@link DEFAULT_TIMEOUT}
   */
  defaultTimeout?: number;
}

const defaultConfig: Required<JiterInitProps> = {
  defaultUrl: DEFAULT_URL,
  defaultTimeout: DEFAULT_TIMEOUT,
};

let JiterConfig: Required<JiterInitProps> = {
  defaultUrl: DEFAULT_URL,
  defaultTimeout: DEFAULT_TIMEOUT,
};

export const Init = (jiterInitProps: JiterInitProps) => {
  JiterConfig = { ...defaultConfig, ...jiterInitProps };
};

export const getJiterConfig = () => JiterConfig;
