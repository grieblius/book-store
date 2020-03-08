import {
  getItemFromStorage,
  saveItemToStorage,
} from '@utils/storage';
import { delay, generateId } from '@utils/helpers';
import { API_DELAY } from '@src/constants';
import { BookStoreModel } from '@src/model';
import { DATA_KEY } from './constants';

export const getList = async (): Promise<BookStoreModel.Book[]> => {
  const books = getItemFromStorage<BookStoreModel.Book[]>(DATA_KEY);

  await delay(API_DELAY);

  if (!books) {
    throw new Error('Book data failure');
  }

  return books;
};

export const getItem = async (id: string): Promise<BookStoreModel.Book> => {
  const books = await getList();
  const book = books.find(((item) => item.id === id));

  if (!book) {
    throw new Error('Book not found');
  }

  return book;
};

export const createItem = async (
  book: BookStoreModel.Book,
) => {
  const books = await getList();
  const bookRecord = { ...book, id: generateId() };

  saveItemToStorage(DATA_KEY, [...books, bookRecord]);
};

export const editItem = async (
  book: BookStoreModel.Book,
) => {
  const books = await getList();
  const bookIndex = books.findIndex((item) => item.id === book.id);

  books.splice(bookIndex, 1, { ...book });

  saveItemToStorage<BookStoreModel.Book>(DATA_KEY, books);
};

export const deleteItem = async (
  id: string,
) => {
  const books = await getList();
  const booksWithoutDeletedBook = books.filter((item) => item.id !== id);

  saveItemToStorage<BookStoreModel.Book>(DATA_KEY, booksWithoutDeletedBook);
};
