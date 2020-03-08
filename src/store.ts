import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';

import usersReducer from '@store/users/reducer';
import usersSaga from '@store/users/sagas';
import booksReducer from '@store/books/reducer';
import booksSaga from '@store/books/sagas';
import ordersReducer from '@store/orders/reducer';
import ordersSaga from '@store/orders/sagas';
import requestReducer from '@store/common/request-reducer';

const rootReducer = combineReducers({
  usersReducer,
  booksReducer,
  ordersReducer,
  requestReducer,
});

function* rootSaga() {
  yield all([
    ...usersSaga,
    ...booksSaga,
    ...ordersSaga,
  ]);
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
