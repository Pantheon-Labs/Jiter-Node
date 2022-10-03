import { getJiterConfig, JiterInit } from './src/config';
import Jiter from './src/jiter';

//  TODO: Remove
// Example:
const main = async () => {
  JiterInit({ apiKey: 'sadasd' });

  const { success: event, failure: createError } = await Jiter.Events.createEvent({
    destination: `https://joswayski.requestcatcher.com`,
    payload: 'Hello there!',
    scheduledTime: new Date(Date() + 8000).toISOString(),
  });

  if (createError) {
    console.log(createError.message);
    return;
  }

  console.log(`Event Created!`, event);
};

main();
