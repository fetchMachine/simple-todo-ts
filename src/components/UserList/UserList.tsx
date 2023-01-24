import { FC, useState, useMemo } from 'react';
import { Input, Button, Radiogroup } from 'components/common';
import { User } from 'components/User';
import { useUsers } from './useUsers';

// 1 вызываем в функц компо + полз хуках
// 2 вызываем верхнеуровнево
// 3 use*

// useState
// 1. 1+
// 2. any type
// 3. manual merge

// useEffect
// тело функции отрабатывает ПОСЛЕ рендера / перерендера
// возвращаемая функция отрабатывает ПЕРЕД перерендером / удалением компонета
// принимает массив зависимостей

const filters = [
  { id: '1', label: 'Забаненные', value: 'banned' },
  { id: '2', label: 'Активные', value: 'active' },
  { id: '3', label: 'Все', value: 'all' },
];

export const UserList: FC = () => {
  const [ newUser, setNewUser ] = useState('');
  const [ filter, setFilter ] = useState(filters[2].value);
  const {
    addUserHandler, deleteUserHandler, userChangeHandler, users
  } = useUsers(newUser, () => setNewUser('') );

  const filteredUsers = useMemo(() => users.filter((user): boolean => {
      if (filter === 'all') {
        return true;
      }

      return filter === 'active' ? !user.isBanned : user.isBanned
    })
  , [ users, filter ]);

  return (
    <div>
      <h1>UserList</h1>
      <Input
        placeholder='type user name'
        value={ newUser }
        onChange={ setNewUser }
      />

      <Button onClick={ addUserHandler }>Добавить пользователя</Button>

      <Radiogroup onChange={ setFilter } items={ filters } name="filter" value={ filter } />

      <ul>
        {filteredUsers.map((user) => (
            <li key={user.id}>
              <User user={ user } onDelete={ deleteUserHandler } onChange={ userChangeHandler } />
            </li>
        ))}
      </ul>
    </div>
  );
};
