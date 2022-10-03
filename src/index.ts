import * as Events from './events';
import { init } from './config';

export * from './events';
export { init } from './config';
export * from './types';

const Jiter = {
  Events,
  init,
};

export default Jiter;
