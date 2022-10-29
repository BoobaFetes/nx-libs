import { core, logger } from '@boobafetes/core';
import { infra } from '@boobafetes/infra';

export * from './lib/design-system';
core();
infra();
logger.functional.info('design-system is loaded');
