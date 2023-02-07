import { createStore } from 'redux';
import { reducer } from './reducer';

export * from './actionCreators';
export * from './selectors';

export const store = createStore(reducer);


