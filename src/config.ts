import { DEFAULT_WEBHOOK_EXPIRATION_MILLISECONDS, DEFAULT_TIMEOUT, DEFAULT_URL } from './consts';
import { JiterConfig, JiterConfigInstance, OverrideJiterConfigOptions } from './types/config';

const defaultConfigOptions: Required<
  Omit<JiterConfig, 'apiKey' | 'signingSecret'> & OverrideJiterConfigOptions
> = {
  baseUrl: DEFAULT_URL,
  timeout: DEFAULT_TIMEOUT,
  millisecondsUntilWebhookExpiration: DEFAULT_WEBHOOK_EXPIRATION_MILLISECONDS,
  encryption: null,
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
  jiterConfig = { ...defaultConfigOptions, ...jiterConfigOptions, encryption: null };
  if (!jiterConfig.apiKey?.trim()) throw new Error('Invalid API Key');
  if (!jiterConfig.signingSecret?.trim()) throw new Error('Invalid Signing Secret');
  if (jiterConfigOptions.encryption) {
    if (jiterConfigOptions.encryption.keys.length === 0) throw new Error('Missing Encryption Keys');

    const ids = new Set<string>();
    jiterConfig.encryption = {
      keys: jiterConfigOptions.encryption.keys.map(({ id, key }) => {
        if (ids.has(id)) throw new Error(`Duplicate Key ID: ${id}`);
        ids.add(id);

        const keyBuffer = Buffer.from(key, 'hex');
        if (keyBuffer.byteLength !== 32) throw new Error('Invalid Key Length');

        return { id, key: keyBuffer };
      }),
    };
  }
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
