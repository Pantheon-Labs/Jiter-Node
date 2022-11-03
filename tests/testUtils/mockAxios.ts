import { Axios, AxiosInstance } from 'axios';
import { getAxios } from '../../src/axios';
import { getMock } from './getMock';

type AxiosMock = Partial<AxiosInstance> & {
  put: jest.Mock<Partial<Axios['put']>>;
  post: jest.Mock<Partial<Axios['post']>>;
  get: jest.Mock<Partial<Axios['get']>>;
};

export const mockAxios = (): AxiosMock => {
  const mock: AxiosMock = {
    put: jest.fn(),
    post: jest.fn(),
    get: jest.fn(),
  };

  getMock(getAxios).mockReturnValue(mock as unknown as AxiosInstance);

  return mock;
};
