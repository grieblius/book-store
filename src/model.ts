export namespace BookStoreModel {
  export interface Storage {
    users: User[];
    books: Book[];
    orders: Order[];
  }

  export interface Book {
    id: string;
    title: string;
    author: string;
    published_date: string;
    book_cover: string;
    quantity: number;
  }

  export interface User {
    id: string;
    name: string;
    surname: string;
    username: string;
    password?: string;
    role: UserRole;
  }

  export type UserRole = 'admin' | 'client';

  export interface Order {
    id: string;
    userId: string;
    status: OrderStatus;
    items: OrderItem[];
  }

  export interface OrderItem {
    book: Book;
    quantity: number;
  }

  export type OrderStatus = 'new' | 'paid' | 'sent' | 'canceled';
}
