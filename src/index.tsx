import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { UserList } from './components/UserList';
import { ErrorBoundary } from './components/common';

ReactDOM
  .createRoot(document.getElementById('myRoot') as HTMLElement)
  .render(<ErrorBoundary fallback={ <span>App is Broken</span> }><UserList /></ErrorBoundary>);
