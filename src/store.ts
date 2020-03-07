import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';

import usersReducer from '@store/users/reducer';
import usersSaga from '@store/users/sagas';
import booksReducer from '@store/books/reducer';
import booksSaga from '@store/books/sagas';
import requestReducer from '@store/common/request-reducer';

const rootReducer = combineReducers({
  usersReducer,
  booksReducer,
  requestReducer,
});

function* rootSaga() {
  yield all([...usersSaga, ...booksSaga]);
}

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
