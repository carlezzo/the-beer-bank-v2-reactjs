import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../modules/reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore);


export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}