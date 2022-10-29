import { infra } from '@boobafetes/infra';
import styles from './design-system.module.scss';

/* eslint-disable-next-line */
export interface DesignSystemProps {}

export function DesignSystem(props: DesignSystemProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DesignSystem!</h1>
      <div>we are using {infra()}!</div>
    </div>
  );
}

export default DesignSystem;
