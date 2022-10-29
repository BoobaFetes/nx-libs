import { Logger } from 'loglevel';

export interface ICoreLogger {
  silly: Logger;
  verbose: Logger;
  technical: Logger;
  functional: Logger;
}
