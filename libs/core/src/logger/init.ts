import { levels } from 'loglevel';
import { ICoreLogger } from './ICoreLogger';

export function init(loggers: ICoreLogger) {
  loggers.silly.setLevel(levels.TRACE);
  loggers.verbose.setLevel(levels.DEBUG);
  loggers.technical.setLevel(levels.INFO);
  loggers.functional.setLevel(levels.WARN);
}
