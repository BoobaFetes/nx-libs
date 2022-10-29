import { getLogger } from 'loglevel';
import { ICoreLogger } from './ICoreLogger';
import { init } from './init';

export const logger: ICoreLogger = {
  silly: getLogger('logger:silly'),
  verbose: getLogger('logger:verbose'),
  technical: getLogger('logger:technical'),
  functional: getLogger('logger:functional'),
};

init(logger);
