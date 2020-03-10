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
    isBooksListLoading: boolean;
    isBooksItemLoading: boolean;
    isBooksCreateLoading: boolean;
    isBooksEditLoading: boolean;
    isBooksDeleteLoading: boolean;
    booksListError: string;
    booksItemError: string;
    booksCreateError: string;
    booksEditError: string;
    booksDeleteError: string;
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
