import { createCronJob, cronJobsPath } from '../../src/cronJobs';
import { mockAxios } from '../testUtils/mockAxios';

const axiosMock = mockAxios();

describe('createCronJob', () => {
  xit('creates a cron job', () => {
    const mockData = { id: 'hello world' };
    axiosMock.post.mockReturnValueOnce({ data: mockData });

    const createCronJobOptions = {
      payload: 'beep',
      expression: '* * * * *',
      destination: 'https://your.app/webhooks',
    };

    const response = createCronJob(createCronJobOptions);

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(
      cronJobsPath,
      expect.objectContaining({ ...createCronJobOptions }),
    );
    expect(response).toBe(mockData);
  });
});
