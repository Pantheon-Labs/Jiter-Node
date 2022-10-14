import { init } from './config';
import * as Events from './events';
import * as Middleware from './middleware';
import * as Utils from './utils';

export { init } from './config';
export * from './events';
export * from './middleware';
export * from './types';
export * from './utils';

const Jiter = {
  init,
  Events,
  Middleware,
  Utils,
};

export default Jiter;
