import { takeLatest, call, put } from 'redux-saga/effects';

import { ActionModel } from '@utils/redux';
import { logError } from '@utils/helpers';
import { BookStoreModel } from '@src/model';
import { Types } from './constants';
import { UsersModel } from './model';

import * as actions from './actions';
import * as api from './api';

export function* initLogin() {
  try {
    const activeUser: BookStoreModel.User = yield call(api.loginByToken);

    yield put(actions.initReceive({ activeUser }));
  } catch (error) {
    logError(error);

    yield put(actions.initError({ error: error.message }));
  }
}

export function* login(action: ActionModel<UsersModel.LoginRequest>) {
  try {
    const { username, password } = action.payload;
    const activeUser:BookStoreModel.User = yield call(api.login, username, password);

    yield put(actions.loginReceive({ activeUser }));
  } catch (error) {
    logError(error);

    yield put(actions.loginError({ error: error?.message }));
  }
}

export function* logout() {
  try {
    yield call(api.logout);
    yield put(actions.logoutReceive());
  } catch (error) {
    logError(error);

    yield put(actions.logoutError({ error: error?.message }));
  }
}

export function* getList() {
  try {
    const users:BookStoreModel.User[] = yield call(api.getList);

    yield put(actions.listReceive({ users }));
  } catch (error) {
    logError(error);

    yield put(actions.listError({ error: error?.message }));
  }
}

export default [
  takeLatest(Types.USERS.INIT.REQUEST, initLogin),
  takeLatest(Types.USERS.LOGIN.REQUEST, login),
  takeLatest(Types.USERS.LOGOUT.REQUEST, logout),
  takeLatest(Types.USERS.LIST.REQUEST, getList),
];
