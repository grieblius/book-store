import { action, ErrorActionModel } from '@utils/redux';

import { Types } from './constants';
import { BooksModel } from './model';

export const listRequest = action(Types.BOOKS.LIST.REQUEST);
export const listReceive = action<BooksModel.ListResponse>(Types.BOOKS.LIST.RECEIVE);
export const listError = action<ErrorActionModel>(Types.BOOKS.LIST.ERROR);

export const itemRequest = action<BooksModel.ItemRequest>(Types.BOOKS.ITEM.REQUEST);
export const itemReceive = action<BooksModel.ItemResponse>(Types.BOOKS.ITEM.RECEIVE);
export const itemError = action<ErrorActionModel>(Types.BOOKS.ITEM.ERROR);

export const createRequest = action<BooksModel.CreateEditRequest>(Types.BOOKS.CREATE.REQUEST);
export const createReceive = action(Types.BOOKS.CREATE.RECEIVE);
export const createError = action<ErrorActionModel>(Types.BOOKS.CREATE.ERROR);

export const editRequest = action<BooksModel.CreateEditRequest>(Types.BOOKS.EDIT.REQUEST);
export const editReceive = action(Types.BOOKS.EDIT.RECEIVE);
export const editError = action<ErrorActionModel>(Types.BOOKS.EDIT.ERROR);

export const deleteRequest = action<BooksModel.ItemRequest>(Types.BOOKS.DELETE.REQUEST);
export const deleteReceive = action(Types.BOOKS.DELETE.RECEIVE);
export const deleteError = action<ErrorActionModel>(Types.BOOKS.DELETE.ERROR);
