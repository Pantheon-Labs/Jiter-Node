import { DEFAULT_WEBHOOK_EXPIRATION_MILLISECONDS, DEFAULT_TIMEOUT, DEFAULT_URL } from './consts';
import { JiterConfigInstance, DefaultedJiterConfig, JiterConfig } from './types/config';

const defaultConfigOptions: Required<DefaultedJiterConfig> = {
  baseUrl: DEFAULT_URL,
  timeout: DEFAULT_TIMEOUT,
  millisecondsUntilWebhookExpiration: DEFAULT_WEBHOOK_EXPIRATION_MILLISECONDS,
};

let jiterConfig: JiterConfigInstance | undefined;

export type JiterInitFn = (configOptions: JiterConfig) => void;

/**
 * Initializes the Jiter SDK
 * @params `configOptions` {@link JiterConfigOptions} for initializing your instance of Jiter
 */
export const init: JiterInitFn = ({ encryption, ...jiterConfigOptions }) => {
  jiterConfig = { ...defaultConfigOptions, ...jiterConfigOptions };
  if (!jiterConfig.apiKey?.trim()) throw new Error('Invalid API Key');
  if (!jiterConfig.signingSecret?.trim()) throw new Error('Invalid Signing Secret');
  if (encryption) {
    if (encryption.keys.length === 0) throw new Error('Missing Encryption Keys');

    const ids = new Set<string>();
    jiterConfig.encryption = {
      keys: encryption.keys.map(({ id, key }) => {
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
