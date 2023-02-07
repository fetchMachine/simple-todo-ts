import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { UserList } from './components/UserList';
import { ErrorBoundary } from './components/common';
import { store } from './store';

ReactDOM
  .createRoot(document.getElementById('myRoot') as HTMLElement)
  .render(
    <Provider store={ store }>
      <ErrorBoundary fallback={ <span>App is Broken</span> }>
        <UserList />
      </ErrorBoundary>
    </Provider>
  );
