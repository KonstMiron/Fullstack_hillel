import { ControlledForm } from './components/ControlledForm';
import { UncontrolledForm } from './components/UncontrolledForm';
import { DataFetcher } from './components/DataFetcher';

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <ControlledForm />
      <hr />
      <UncontrolledForm />
      <hr />
      <DataFetcher />
    </div>
  );
}

export default App;