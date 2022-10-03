import { getJiterConfig, JiterInit } from './src/config';
import Jiter from './src/jiter';

//  TODO: Remove
// Example:
const main = async () => {
  JiterInit({ apiKey: 'sadasd' });

  await Jiter.Events.getManyEvents({});
};

main();
