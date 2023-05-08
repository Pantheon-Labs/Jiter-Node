import axios from 'axios';
import { isJiterError } from '../src/isJiterError';

const isAxiosErrorSpy = jest.spyOn(axios, 'isAxiosError');

describe('isJiterError', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns a type predicate if the error is a jiter error', () => {
    const code = '1234';
    const error = { code } as unknown;
    isAxiosErrorSpy.mockReturnValueOnce(true);

    if (!isJiterError(error)) {
      throw new Error('type predicate incorrect; should be jiter error');
    }

    expect(error.code).toEqual(code);
  });

  it('returns false for a random object', () => {
    expect(isJiterError(new Error())).toBeFalsy();
  });
});
