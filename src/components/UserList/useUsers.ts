import { useEffect } from 'react';
import { User } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, addUser, changeUser, deleteUser, setUsers } from 'store';

const localStorageKey = '__users__';

export const useUsers = (newUser: string, onAdd: () => void) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem(localStorageKey) ?? '[]');

    dispatch(setUsers(users));
  }, [ dispatch ]);

  const users = useSelector(getUsers);


  const addUserHandler = () => {
    dispatch(addUser({ name: newUser, isBanned: false }))
    onAdd();
  };

  const userChangeHandler = (id: User['id'], newUser: Partial<User>) => {
    dispatch(changeUser(id, newUser))
  }

  const deleteUserHandler = (id: User['id']) => {
    dispatch(deleteUser(id))
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
