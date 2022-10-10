import { DEFAULT_TIMEOUT, DEFAULT_URL } from './consts';
import { JiterConfig, JiterConfigInstance, OverrideJiterConfigOptions } from './types/config';

const defaultConfigOptions: Required<Omit<JiterConfig, 'apiKey'> & OverrideJiterConfigOptions> = {
  baseUrl: DEFAULT_URL,
  timeout: DEFAULT_TIMEOUT,
};

let jiterConfig: JiterConfigInstance | undefined;

export interface JiterInit {
  (config: JiterConfig): void;
  (config: JiterConfig & Partial<OverrideJiterConfigOptions>): void;
}
/**
 * Initializes the Jiter SDK
 * @params `configOptions` {@link JiterConfigOptions} for initializing your instance of Jiter
 */
export const init: JiterInit = (jiterConfigOptions) => {
  jiterConfig = { ...defaultConfigOptions, ...jiterConfigOptions };
  if (!jiterConfig.apiKey?.trim()) throw new Error('Invalid API Key');
};

/**
 *
 * @returns the initialized copy of the current JiterConfig
 * @throws when the config has not been initialized
 */
export const getJiterConfig = (): JiterConfigInstance => {
  if (!jiterConfig) throw new Error('Jiter is not initialized');
  return jiterConfig;
};
