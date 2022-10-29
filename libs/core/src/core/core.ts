import { logger } from '../logger';

export function core(): string {
  logger.silly.trace('core is called');
  return 'core';
}
