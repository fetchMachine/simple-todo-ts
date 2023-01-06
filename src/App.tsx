import { Input, Button, Checkbox, Radiogroup } from './common';

const users = [{ id: 1, name: 'Евклидий', isBanned: true }, { id: 2, name: 'Петр', isBanned: false }]

const filters = [
  { id: '1', label: 'Забаненные', value: 'banned' },
  { id: '2', label: 'Активные', value: 'active' },
  { id: '3', label: 'Все', value: 'all' },
];

const filterState: string = 'all';

export const App = () =>  {
  return (
    <div>
      <Input value="Аноним" />
      <Button onClick={ () => alert('Когда-нибудь добавлю') }>Добавить пользователя</Button>

      <Radiogroup items={ filters } name="filter" value={ filterState } />

      <ul>
        {users
          .filter((user): boolean => {
            if (filterState === 'all') {
              return true;
            }

            if (filterState === 'active') {
              return !user.isBanned;
            }

            return user.isBanned;
          })
          .map((user) => (
          <li key={ user.id }>
            <Checkbox checked={ user.isBanned } />
            {user.name}
            {user.isBanned && <Button type='submit' onClick={ () => alert('Когда-нибудь удалю') }>Удалить пользователя</Button>}
            {/* <button disabled={ !user.isBanned } onClick={ () => alert('Когда-нибудь удалю') }>Удалить пользователя</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
