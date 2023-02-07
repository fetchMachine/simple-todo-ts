import { Store, User } from './types';

export const getUsers = (store: Store): User[] => store.users;
