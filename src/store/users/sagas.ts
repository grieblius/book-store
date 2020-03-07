import { takeLatest, call, put } from 'redux-saga/effects';

import { ActionModel } from '@utils/redux';
import { Types } from './constants';
import { UsersModel } from './model';

import * as actions from './actions';
import * as api from './api';

export function* init() {
  try {
    const response: UsersModel.LoginResponse = yield call(api.loginByToken);

    yield put(actions.initReceive(response));
  } catch (error) {
    yield put(actions.initError(error.message));
  }
}

export function* login(action: ActionModel<UsersModel.LoginRequest>) {
  try {
    const { username, password } = action.payload;
    const response:UsersModel.LoginResponse = yield call(api.login, username, password);

    yield put(actions.loginReceive(response));
  } catch (error) {
    yield put(actions.loginError(error.message));
  }
}

export function* logout() {
  try {
    yield call(api.logout);
    yield put(actions.logoutReceive());
  } catch (error) {
    yield put(actions.logoutError(error.message));
  }
}

export function* getList() {
  try {
    const response:UsersModel.ListResponse = yield call(api.getList);

    yield put(actions.listReceive(response));
  } catch (error) {
    yield put(actions.listError(error.message));
  }
}

export default [
  takeLatest(Types.USERS.INIT.REQUEST, init),
  takeLatest(Types.USERS.LOGIN.REQUEST, login),
  takeLatest(Types.USERS.LOGOUT.REQUEST, logout),
  takeLatest(Types.USERS.LIST.REQUEST, getList),
];
