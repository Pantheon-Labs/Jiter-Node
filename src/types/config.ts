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

export type EncryptionOptions<Key = string> = {
  /**
   * The encryption keys used to encrypt and decrypt data before sending it to Jiter.
   *
   * The last key in the array is the key used to encrypt new data. Old keys are used to decrypt data that was encrypted with that key.
   */
  keys: Array<{
    /**
     * The ID of the key, used to identify which key to use when encrypting/decrypting data.
     *
     * Must be unique within the array of keys and must not be changed once set.
     *
     * This will be sent with the encrypted data so that the correct key is used to decrypt data when it returns.
     */
    id: string;

    /**
     * The encryption key used to encrypt and decrypt data before sending it to Jiter and when it returns.
     *
     * Must be 32 bytes long encoded as hexadecimal. Keys should be generated with a cryptographically secure random byte generator.
     */
    key: Key;
  }>;
};

export type JiterConfigOptions = {
  /**
   * @default {@link DEFAULT_TIMEOUT}
   */
  timeout?: number;

  /**
   * The encryption options used to encrypt and decrypt data before sending it to Jiter.
   *
   * @default null (No encryption)
   */
  encryption?: EncryptionOptions | null;
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

export type JiterConfigInstance = Omit<
  Required<JiterConfig & OverrideJiterConfigOptions>,
  'encryption'
> & { encryption: EncryptionOptions<Buffer> | null };
