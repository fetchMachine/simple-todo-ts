import React, { Component, PureComponent } from 'react';
import type { User as IUser } from './types';
import { Button, Checkbox } from './common';
import css from './app.module.css';


interface UserProps {
  user: IUser;
  toggleUserHandler: (id: IUser['id']) => void;
  deleteUserHandler: (id: IUser['id']) => void;
}

export class User extends PureComponent<UserProps>  {
  get userName () {
    return this.props.user.name;
  }

  // shouldComponentUpdate(nextProps: UserProps, nextState: any): boolean {
  //   return nextProps.user.isBanned !== this.props.user.isBanned;
  // }

  componentDidMount(): void {
    console.log(`mount: ${this.userName}`);
  }

  componentDidUpdate(): void {
    console.log(`update: ${this.userName}`);
  }

  componentWillUnmount(): void {
    console.log(`unmount: ${this.userName}`);
  }

  render() {
    return (
      <div>
      <Checkbox checked={ this.props.user.isBanned } onChange={ () => this.props.toggleUserHandler(this.props.user.id) } />
      {this.props.user.name}
      {this.props.user.isBanned && <Button className={ css.alertBtn } onClick={ () => this.props.deleteUserHandler(this.props.user.id) }>Удалить пользователя</Button>}
    </div>
    )
  }
}
