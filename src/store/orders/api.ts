import {
  getItemFromStorage,
  saveItemToStorage,
} from '@utils/storage';
import { delay, getUserIdFromToken, generateId } from '@utils/helpers';
import { API_DELAY } from '@src/constants';
import { BookStoreModel } from '@src/model';
import { DATA_KEY, DATA_KEY_ITEM } from './constants';

const getAllOrders = async (): Promise<BookStoreModel.Order[]> => {
  const orders = getItemFromStorage<BookStoreModel.Order[]>(DATA_KEY);

  await delay(API_DELAY);

  if (!orders) {
    throw new Error('Order data failure');
  }

  return orders;
};

const updateBookQuantity = (id: string, delta: number) => {
  const books = getItemFromStorage<BookStoreModel.Book[]>(DATA_KEY_ITEM);
  const bookIndex = books.findIndex((item) => item.id === id);
  const book = { ...books[bookIndex] };

  if (book.quantity < delta * -1) {
    throw new Error(`Not enough items in stock. Available units: ${book.quantity}`);
  }

  book.quantity += delta;
  books.splice(bookIndex, 1, book);

  saveItemToStorage<BookStoreModel.Book>(DATA_KEY_ITEM, books);
};

const restoreBookQuantities = (items: BookStoreModel.OrderItem[]) => {
  items.forEach(({ book, quantity }) => updateBookQuantity(book.id, quantity));
};

const filterUserOrders = (orders: BookStoreModel.Order[]) => {
  const userId = getUserIdFromToken();

  if (!userId) {
    throw new Error('Only logged in users can make purchases');
  }

  return orders.filter((order) => order.userId === userId);
};

const findNewOrder = (orders: BookStoreModel.Order[]) => orders.find((order) => order.status === 'new');

const saveOrder = (currentOrder: BookStoreModel.Order, orders: BookStoreModel.Order[]) => {
  const orderIndex = orders.findIndex((order) => order.id === currentOrder.id);
  const newOrders = [...orders];

  newOrders.splice(orderIndex, 1, { ...currentOrder });

  if (currentOrder.status === 'canceled') {
    restoreBookQuantities(currentOrder.items);
  }

  saveItemToStorage<BookStoreModel.Order>(DATA_KEY, newOrders);
};

const deleteOrder = (id: string, orders: BookStoreModel.Order[]) => {
  const ordersWithoutCurrentOrder = orders.filter((item) => item.id !== id);

  saveItemToStorage<BookStoreModel.Order>(DATA_KEY, ordersWithoutCurrentOrder);
};

export const getList = async (): Promise<BookStoreModel.Order[]> => {
  const orders = await getAllOrders();

  return orders
    .filter((order) => order.status === 'new' || order.status === 'paid')
    .slice()
    .reverse();
};

export const updateStatus = async (id: string, status: BookStoreModel.OrderStatus) => {
  const orders = await getList();

  const currentOrder = orders.find((order) => order.id === id);

  if (!currentOrder) {
    throw new Error('Order not found');
  }

  saveOrder({ ...currentOrder, status }, orders);
};

export const userGetList = async (): Promise<BookStoreModel.Order[]> => {
  const orders = await getAllOrders();
  const userOrders = filterUserOrders(orders);

  return userOrders.slice().reverse();
};

export const userUpdateStatus = async (status: BookStoreModel.OrderStatus) => {
  const orders = await getAllOrders();
  const userOrders = filterUserOrders(orders);

  const currentOrder = userOrders.find((order) => order.status === 'new');

  if (!currentOrder) {
    throw new Error('Order not found');
  }

  saveOrder({ ...currentOrder, status }, orders);
};

export const addItem = async (book: BookStoreModel.Book, quantity: number) => {
  const orders = await getAllOrders();
  const userOrders = filterUserOrders(orders);
  const order = findNewOrder(userOrders);

  updateBookQuantity(book.id, quantity * -1);

  if (!order) {
    saveItemToStorage<BookStoreModel.Order>(DATA_KEY, [...orders, {
      id: generateId(),
      userId: getUserIdFromToken(),
      status: 'new',
      items: [{ book, quantity }],
    }]);

    return;
  }

  const items = [...order.items];
  const itemIndex = items.findIndex(((item) => item.book.id === book.id));

  if (itemIndex >= 0) {
    items.splice(itemIndex, 1, { book, quantity: items[itemIndex].quantity + quantity });
  } else {
    items.push({ book, quantity });
  }

  saveOrder({ ...order, items }, orders);
};

export const removeItem = async (itemId: string) => {
  const orders = await getAllOrders();
  const userOrders = filterUserOrders(orders);
  const order = findNewOrder(userOrders);

  const items = [...order.items];
  const itemIndex = items.findIndex(((item) => item.book.id === itemId));
  const { quantity } = items[itemIndex];

  updateBookQuantity(itemId, quantity);
  items.splice(itemIndex, 1);

  if (items.length) {
    saveOrder({ ...order, items }, orders);
  } else {
    deleteOrder(order.id, orders);
  }
};

export const updateItemQuantity = async (itemId: string, quantity: number) => {
  if (typeof quantity !== 'number' || quantity <= 0) {
    throw new Error('Incorrect quantity provided.');
  }

  const orders = await getAllOrders();
  const userOrders = filterUserOrders(orders);
  const order = findNewOrder(userOrders);

  const items = [...order.items];
  const itemIndex = items.findIndex(((item) => item.book.id === itemId));

  updateBookQuantity(itemId, items[itemIndex].quantity - quantity);

  items[itemIndex].quantity = quantity;
  saveOrder({ ...order, items }, orders);
};
