import { takeLatest, call, put } from 'redux-saga/effects';

import { ActionModel } from '@utils/redux';
import { logError } from '@utils/helpers';
import { BookStoreModel } from '@src/model';
import * as bookActions from '@store/books/actions';
import { Types } from './constants';
import { OrdersModel } from './model';

import * as actions from './actions';
import * as api from './api';

export function* getList() {
  try {
    const response:OrdersModel.ListResponse = yield call(api.getList);

    yield put(actions.listReceive(response));
  } catch (error) {
    logError(error);

    yield put(actions.listError({ error: error.message }));
  }
}

export function* updateStatus(action: ActionModel<OrdersModel.UpdateStatusRequest>) {
  try {
    const { id, status } = action.payload;

    yield call(api.updateStatus, id, status);

    yield put(actions.updateStatusReceive());
    yield put(actions.listRequest());
  } catch (error) {
    logError(error);

    yield put(actions.updateStatusError({ error: error.message }));
  }
}

export function* userGetList() {
  try {
    const orders:BookStoreModel.Order[] = yield call(api.userGetList);

    yield put(actions.userListReceive({ orders }));
  } catch (error) {
    logError(error);

    yield put(actions.userListError({ error: error.message }));
  }
}

export function* userUpdateStatus(action: ActionModel<OrdersModel.UserUpdateStatusRequest>) {
  try {
    const { status } = action.payload;

    yield call(api.userUpdateStatus, status);

    yield put(actions.userUpdateStatusReceive());
    yield put(actions.userListRequest());
  } catch (error) {
    logError(error);

    yield put(actions.userUpdateStatusError({ error: error.message }));
  }
}

export function* addItem(action: ActionModel<OrdersModel.ItemAddRequest>) {
  try {
    const { book, quantity } = action.payload;

    yield call(api.addItem, book, quantity);

    yield put(actions.itemAddReceive());
    yield put(actions.userListRequest());
    yield put(bookActions.listRequest());
  } catch (error) {
    logError(error);

    yield put(actions.itemAddError({ error: error.message }));
  }
}

export function* removeItem(action: ActionModel<OrdersModel.ItemRemoveRequest>) {
  try {
    const { itemId } = action.payload;

    yield call(api.removeItem, itemId);

    yield put(actions.itemRemoveReceive());
    yield put(actions.userListRequest());
  } catch (error) {
    logError(error);

    yield put(actions.itemRemoveError({ error: error.message }));
  }
}

export function* updateItemQuantity(action: ActionModel<OrdersModel.ItemUpdateQuantityRequest>) {
  try {
    const { itemId, quantity } = action.payload;

    yield call(api.updateItemQuantity, itemId, quantity);

    yield put(actions.itemUpdateQuantityReceive());
    yield put(actions.userListRequest());
  } catch (error) {
    logError(error);

    yield put(actions.itemUpdateQuantityError({ error: error.message }));
  }
}

export default [
  takeLatest(Types.ORDERS.LIST.REQUEST, getList),
  takeLatest(Types.ORDERS.UPDATE_STATUS.REQUEST, updateStatus),
  takeLatest(Types.ORDERS.USER.LIST.REQUEST, userGetList),
  takeLatest(Types.ORDERS.USER.UPDATE_STATUS.REQUEST, userUpdateStatus),
  takeLatest(Types.ORDERS.ITEM.ADD.REQUEST, addItem),
  takeLatest(Types.ORDERS.ITEM.REMOVE.REQUEST, removeItem),
  takeLatest(Types.ORDERS.ITEM.UPDATE_QUANTITY.REQUEST, updateItemQuantity),
];
