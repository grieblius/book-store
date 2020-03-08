import { takeLatest, call, put } from 'redux-saga/effects';

import { ActionModel } from '@utils/redux';
import { logError } from '@utils/helpers';
import { BookStoreModel } from '@src/model';
import { Types } from './constants';
import { BooksModel } from './model';

import * as actions from './actions';
import * as api from './api';

export function* getList() {
  try {
    const books:BookStoreModel.Book[] = yield call(api.getList);

    yield put(actions.listReceive({ books }));
  } catch (error) {
    logError(error);

    yield put(actions.listError(error));
  }
}

export function* getItem(action: ActionModel<BooksModel.ItemRequest>) {
  try {
    const { id } = action.payload;
    const book:BookStoreModel.Book = yield call(api.getItem, id);

    yield put(actions.itemReceive({ book }));
  } catch (error) {
    logError(error);

    yield put(actions.itemError(error));
  }
}

export function* createItem(action: ActionModel<BooksModel.CreateEditRequest>) {
  try {
    const { book } = action.payload;

    yield call(api.createItem, book);

    yield put(actions.createReceive());
    yield put(actions.listRequest());
  } catch (error) {
    logError(error);

    yield put(actions.createError({ error: error.message }));
  }
}

export function* editItem(action: ActionModel<BooksModel.CreateEditRequest>) {
  try {
    const { book } = action.payload;

    yield call(api.editItem, book);

    yield put(actions.editReceive());
    yield put(actions.listRequest());
  } catch (error) {
    logError(error);

    yield put(actions.editError({ error: error.message }));
  }
}

export function* deleteItem(action: ActionModel<BooksModel.ItemRequest>) {
  try {
    const { id } = action.payload;

    yield call(api.deleteItem, id);

    yield put(actions.deleteReceive());
    yield put(actions.listRequest());
  } catch (error) {
    logError(error);

    yield put(actions.deleteError({ error: error.message }));
  }
}

export default [
  takeLatest(Types.BOOKS.LIST.REQUEST, getList),
  takeLatest(Types.BOOKS.ITEM.REQUEST, getItem),
  takeLatest(Types.BOOKS.CREATE.REQUEST, createItem),
  takeLatest(Types.BOOKS.EDIT.REQUEST, editItem),
  takeLatest(Types.BOOKS.DELETE.REQUEST, deleteItem),
];
