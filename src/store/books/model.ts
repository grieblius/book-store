import { BookStoreModel } from '@src/model';

export namespace BooksModel {
  export interface State {
    booksReducer: Reducer;
    requestReducer: RequestReducer;
  }

  export interface Reducer {
    books: BookStoreModel.Book[];
    activeBook: BookStoreModel.Book;
  }

  export interface RequestReducer {
    isUsersLoginLoading: boolean;
    isUsersListLoading: boolean;
    usersLoginError: string;
    usersListError: string;
  }

  export interface ListResponse {
    books: BookStoreModel.Book[];
  }

  export interface ItemRequest {
    id: string;
  }

  export interface ItemResponse {
    book: BookStoreModel.Book;
  }

  export interface CreateEditRequest {
    book: BookStoreModel.Book;
  }

}
