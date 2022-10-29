// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DesignSystem } from '@boobafetes/design-system';
import './app.module.scss';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <>
      <DesignSystem />
      <NxWelcome title="sample" />
      <div />
    </>
  );
}

export default App;
