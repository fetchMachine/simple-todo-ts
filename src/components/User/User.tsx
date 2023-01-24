import React, { FC, useState } from 'react';
import type { User as IUser } from '../types';
import { Button, Checkbox, Input } from 'components/common';
import css from './user.module.css';


interface UserProps {
  user: IUser;
  onChange: (id: IUser['id'], newUser: Partial<IUser>) => void;
  onDelete: (id: IUser['id']) => void;
}


export const User: FC<UserProps> = ({
  onDelete,  onChange, user
}) =>  {
  const [ name, setName ] = useState(user.name);
  const [ isEdited, setIsEdited ] = useState(false);

  const editStartHandler = () => {
    setName(user.name);
    setIsEdited(true);
  }

  const editEndHandler = () => {
    setIsEdited(false);
    onChange(user.id, { name });
  }

  return (
    <div>
      <Checkbox checked={ user.isBanned } onChange={ () => onChange(user.id, { isBanned: !user.isBanned }) } />
      { isEdited ? <Input value={ name } onChange={ setName } /> : <span>{user.name}</span> }
      { user.isBanned && <Button className={ css.alertBtn } onClick={ () => onDelete(user.id) }>Удалить пользователя</Button> }
      { !user.isBanned && !isEdited && <Button onClick={ editStartHandler }>Редактировать</Button> }
      { !user.isBanned && isEdited && <Button onClick={ editEndHandler }>Сохранить</Button> }
    </div>
  )
}
