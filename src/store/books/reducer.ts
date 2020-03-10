import { ActionModel } from '@utils/redux';
import { Types } from './constants';
import { BooksModel } from './model';

export const initialState: BooksModel.Reducer = {
  books: [],
  activeBook: null,
};

export default (
  state: BooksModel.Reducer = initialState,
  action:
  | ActionModel<BooksModel.ListResponse, typeof Types.BOOKS.LIST.RECEIVE>
  | ActionModel<BooksModel.ItemResponse, typeof Types.BOOKS.ITEM.RECEIVE>,
): BooksModel.Reducer => {
  switch (action.type) {
    case Types.BOOKS.LIST.RECEIVE: {
      const { books } = action.payload;

      return {
        ...state,
        books,
      };
    }
    case Types.BOOKS.ITEM.RECEIVE: {
      const { book } = action.payload;

      return {
        ...state,
        activeBook: book,
      };
    }
    default: {
      return state;
    }
  }
};
