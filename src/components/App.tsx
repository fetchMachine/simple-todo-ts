import { Component } from 'react';
import { Input, Button, Radiogroup, ErrorBoundary } from './common';
import { User as IUser } from './types';
import { User } from './User';

interface AppProps {
  className?: string;
}

interface AppState {
  newUserInput: string;
  users: IUser[];
  filter: string;
}

export class App extends Component<AppProps, AppState> {
  state: AppState = {
    newUserInput: '',
    users: [],
    filter: 'all'
  };

  filters = [
    { id: '1', label: 'Забаненные', value: 'banned' },
    { id: '2', label: 'Активные', value: 'active' },
    { id: '3', label: 'Все', value: 'all' },
  ];

  localStorageKey = '__users__';

  addUserHandler = () =>  {
    if (this.state.newUserInput.trim().length === 0) {
      return alert('Не валидное имя пользователя');
    }

    this.setState((prevState) => ({
      users: [ ...prevState.users, { id: prevState.users.length + 1, isBanned: false, name: prevState.newUserInput } ],
      newUserInput: ''
    }));
  }

  deleteUserHandler (id: IUser['id']) {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.id !== id)
    }));
  }

  changeFilterHandler = (filter: string) => {
    this.setState({ filter });
  }

  toggleUserHandler = (id: IUser['id']) => {
    this.setState((prevState) => ({
      users: prevState.users.map((user) => user.id === id ? { ...user, isBanned: !user.isBanned } : user),
    }));
  }

  componentDidMount () {
    const users = JSON.parse(localStorage.getItem(this.localStorageKey) ?? '[]');

    if (users.length) {
      this.setState({
        users
      });
    }
  }

  componentDidUpdate (prevProps: AppProps, prevState: AppState) {
    if (prevState.users !== this.state.users) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.state.users));
    }
  }

  render () {
    return (
      <div className={ this.props.className }>
        <Input value={ this.state.newUserInput } onChange={ (e) => this.setState({ newUserInput: e.target.value }) } />

        <Button onClick={ this.addUserHandler }>Добавить пользователя</Button>

        <Radiogroup onChange={ this.changeFilterHandler } items={ this.filters } name="filter" value={ this.state.filter } />

        <ErrorBoundary fallback={ <span>Broken</span> }>
          <ul>
            {this.state.users
              .filter((user): boolean => {
                if (this.state.filter === 'all') {
                  return true;
                }

                if (this.state.filter === 'active') {
                  return !user.isBanned;
                }

                return user.isBanned;
              })
              .map((user) => (
              <li key={ user.id }>
                <User user={ user } deleteUserHandler={ this.deleteUserHandler } toggleUserHandler={ this.toggleUserHandler } />
              </li>
            ))}
          </ul>
        </ErrorBoundary>
      </div>
    );
  }
}
