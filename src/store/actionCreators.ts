import { ADD_USER_ACTION, SET_USERS_ACTION, DELETE_USER_ACTION, CHANGE_USER_ACTION, USERS_ACTIONS_TYPES, User } from './types';

export const setUsers = (users: User[]): SET_USERS_ACTION => ({
  type: USERS_ACTIONS_TYPES.SET_USERS,
  payload: users
})

export const deleteUser = (id: User['id']): DELETE_USER_ACTION => ({
  type: USERS_ACTIONS_TYPES.DELETE_USER,
  payload: id
})

export const addUser = (user: Omit<User, 'id'>): ADD_USER_ACTION => ({
  type: USERS_ACTIONS_TYPES.ADD_USER,
  payload: user
})

export const changeUser = (id: User['id'], user: Omit<Partial<User>, 'id'>): CHANGE_USER_ACTION => ({
  type: USERS_ACTIONS_TYPES.CHANGE_USER,
  payload: { id, user }
})
