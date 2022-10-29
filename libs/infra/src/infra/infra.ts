import { core, logger } from '@boobafetes/core';

export function infra(): string {
  const _core = core();
  logger.silly.trace('infra is called');
  return `${_core} & infra`;
}
