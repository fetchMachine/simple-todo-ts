import { Component } from 'react';
import { Input, Button, Checkbox, Radiogroup } from './common';
import css from './app.module.css';

interface User {
  id: number;
  name: string;
  isBanned: boolean;
}

interface AppProps {
  className?: string;
}

interface AppState {
  newUserInput: string;
  users: User[];
  filter: string;
  counter: number;
}

export class App extends Component<AppProps, AppState> {
  state: AppState = {
    newUserInput: '',
    users: [],
    filter: 'all',
    counter: 0,
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

  deleteUserHandler (id: User['id']) {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.id !== id)
    }));
  }

  changeFilterHandler = (filter: string) => {
    this.setState({ filter });
  }

  toggleUserHandler = (id: User['id']) => {
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

  componentDidUpdate (prevProps: any, prevState: any) {
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
              <Checkbox checked={ user.isBanned } onChange={ () => this.toggleUserHandler(user.id) } />
              {user.name}
              {user.isBanned && <Button className={ css.alertBtn } onClick={ () => this.deleteUserHandler(user.id) }>Удалить пользователя</Button>}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
