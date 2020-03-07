import { takeLatest, call, put } from 'redux-saga/effects';

import { ActionModel } from '@utils/redux';
import { Types } from './constants';
import { BooksModel } from './model';

import * as actions from './actions';
import * as api from './api';

export function* getList() {
  try {
    const response:BooksModel.ListResponse = yield call(api.getList);

    yield put(actions.listReceive(response));
  } catch (error) {
    yield put(actions.listError(error.message));
  }
}

export function* getItem(action: ActionModel<BooksModel.ItemRequest>) {
  try {
    const { id } = action.payload;
    const response:BooksModel.ItemResponse = yield call(api.getItem, id);

    yield put(actions.itemReceive(response));
  } catch (error) {
    yield put(actions.itemError(error.message));
  }
}

export function* createItem(action: ActionModel<BooksModel.CreateEditRequest>) {
  try {
    const { book } = action.payload;

    yield call(api.createItem, book);

    yield put(actions.createReceive());
    yield put(actions.listRequest());
  } catch (error) {
    yield put(actions.createError(error.message));
  }
}

export function* editItem(action: ActionModel<BooksModel.CreateEditRequest>) {
  try {
    const { book } = action.payload;

    yield call(api.editItem, book);

    yield put(actions.editReceive());
    yield put(actions.listRequest());
  } catch (error) {
    yield put(actions.editError(error.message));
  }
}

export function* deleteItem(action: ActionModel<BooksModel.ItemRequest>) {
  try {
    const { id } = action.payload;

    yield call(api.deleteItem, id);

    yield put(actions.deleteReceive());
    yield put(actions.listRequest());
  } catch (error) {
    yield put(actions.deleteError(error.message));
  }
}

export default [
  takeLatest(Types.BOOKS.LIST.REQUEST, getList),
  takeLatest(Types.BOOKS.ITEM.REQUEST, getItem),
  takeLatest(Types.BOOKS.CREATE.REQUEST, createItem),
  takeLatest(Types.BOOKS.EDIT.REQUEST, editItem),
  takeLatest(Types.BOOKS.DELETE.REQUEST, deleteItem),
];
