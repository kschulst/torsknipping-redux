import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateVariant from 'redux-immutable-state-invariant';

export default function configueStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(reduxImmutableStateVariant())
  );
}
