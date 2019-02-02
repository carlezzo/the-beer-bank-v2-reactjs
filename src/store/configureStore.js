import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { rootReducer } from '../modules/reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk, logger)
)(createStore);


export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}