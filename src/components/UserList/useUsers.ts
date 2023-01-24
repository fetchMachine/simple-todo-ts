import { useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { v4 as uuidv4 } from 'uuid';

const localStorageKey = '__users__';

export const useUsers = (newUser: string, onAdd: () => void) => {
  const [ users, setUsers ] = useState<User[]>(JSON.parse(localStorage.getItem(localStorageKey) ?? '[]'));

  const addUserHandler = useCallback(() => {
    setUsers((prevUsers) => [ ...prevUsers, { name: newUser, id: uuidv4(), isBanned: false } ]);
    onAdd();
  }, [ setUsers, newUser, onAdd ]);

  const userChangeHandler = (id: User['id'], newUser: Partial<User>) => {
    setUsers((prevUsers) => prevUsers.map((user) => user.id === id ? { ...user, ...newUser } : user));
  }

  const deleteUserHandler = (id: User['id']) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  }

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(users));
  }, [ users ]);

  return {
    users,
    addUserHandler,
    userChangeHandler,
    deleteUserHandler,
  };
}
