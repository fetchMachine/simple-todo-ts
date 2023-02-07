export interface User {
  id: string;
  name: string;
  isBanned: boolean;
}

export interface Store {
  users: User[];
}

export enum USERS_ACTIONS_TYPES {
  SET_USERS = 'SET_USERS',
  ADD_USER = 'ADD_USER',
  CHANGE_USER = 'CHANGE_USER',
  DELETE_USER = 'DELETE_USER'
}

export type SET_USERS_ACTION = { type: USERS_ACTIONS_TYPES.SET_USERS; payload: User[] };
export type ADD_USER_ACTION = { type: USERS_ACTIONS_TYPES.ADD_USER; payload: Omit<User, 'id'> };
export type DELETE_USER_ACTION = { type: USERS_ACTIONS_TYPES.DELETE_USER; payload: User['id'] };
export type CHANGE_USER_ACTION = {
  type: USERS_ACTIONS_TYPES.CHANGE_USER;
  payload: { id: User['id'], user: Omit<Partial<User>, 'id'> }
};

export type Action = DELETE_USER_ACTION | SET_USERS_ACTION | ADD_USER_ACTION | CHANGE_USER_ACTION
