import { v4 as uuidv4 } from 'uuid';
import { Store, USERS_ACTIONS_TYPES, Action } from './types';

const initialState: Store = {
  users: []
};

export const reducer = (store: Store = initialState, action: Action): Store => {
  switch (action.type) {
    case USERS_ACTIONS_TYPES.SET_USERS: {
      return { users: action.payload };
    }

    case USERS_ACTIONS_TYPES.ADD_USER: {
      return { users: [ ...store.users, { ...action.payload, id: uuidv4() } ] };
    }

    case USERS_ACTIONS_TYPES.CHANGE_USER: {
      const { id, user: newUser } = action.payload;

      return { users: store.users.map((user) => user.id === id ? { ...user, ...newUser } : user) };
    }

    case USERS_ACTIONS_TYPES.DELETE_USER: {
      return { users: store.users.filter((user) => user.id !== action.payload) };
    }

    default: {
      return store;
    }
  }
}
