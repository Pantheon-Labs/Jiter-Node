import Jiter, { cronJobsPath } from '../../src';
import { BaseCronJob } from '../../src/cronJobs/types';
import { mockAxios } from '../testUtils/mockAxios';

const axiosMock = mockAxios();

describe('CronJobs.getManyCronJobs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('gets all of the cron jobs in your org', async () => {
    const id = '1337';
    const mockResponseData: Partial<BaseCronJob>[] = [{ id }];
    axiosMock.get.mockReturnValueOnce({ data: mockResponseData });

    const response = await Jiter.CronJobs.getManyCronJobs();
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(cronJobsPath);
    expect(response).toBe(mockResponseData);
  });
});
