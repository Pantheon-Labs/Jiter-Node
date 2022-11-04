import Jiter from '../../src';
import { cronJobsPath } from '../../src/cronJobs/consts';
import { BaseCronJob, CreateCronJobOptions } from '../../src/cronJobs/types';
import { mockAxios } from '../testUtils/mockAxios';

const axiosMock = mockAxios();

describe('CronJobs.createCronJob', () => {
  it('creates a cron job', async () => {
    const mockData: Partial<BaseCronJob> = { id: 'hello world' };
    axiosMock.post.mockReturnValueOnce({ data: mockData });

    const createCronJobOptions: CreateCronJobOptions = {
      payload: 'beep',
      expression: '* * * * *',
      destination: 'https://your.app/webhooks',
    };

    const response = await Jiter.CronJobs.createCronJob(createCronJobOptions);

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(
      cronJobsPath,
      expect.objectContaining({ ...createCronJobOptions }),
    );
    expect(response).toBe(mockData);
  });
});
