import { BookStoreModel } from '@src/model';

export namespace OrdersModel {
  export interface State {
    ordersReducer: Reducer;
    requestReducer: RequestReducer;
  }

  export interface Reducer {
    orders: BookStoreModel.Order[];
    userOrders: BookStoreModel.Order[];
    activeOrder: BookStoreModel.Order;
  }

  export interface RequestReducer {
    isOrdersListLoading: boolean;
    isOrdersUpdateStatusLoading: boolean;
    isOrdersUserListLoading: boolean;
    isOrdersUserUpdateStatusLoading: boolean;
    isOrdersItemAddLoading: boolean;
    isOrdersItemRemoveLoading: boolean;
    isOrdersItemUpdateQuantityLoading: boolean;
    ordersListError: string;
    ordersUpdateStatusError: string;
    ordersUserListError: string;
    ordersUserUpdateStatusError: string;
    ordersItemAddError: string;
    ordersItemRemoveError: string;
    ordersItemUpdateQuantityError: string;
  }

  export interface ListResponse {
    orders: BookStoreModel.Order[];
  }

  export interface UpdateStatusRequest {
    id: string;
    status: BookStoreModel.OrderStatus;
  }

  export interface UserUpdateStatusRequest {
    status: BookStoreModel.OrderStatus;
  }

  export interface ItemAddRequest extends BookStoreModel.OrderItem { }

  export interface ItemRemoveRequest {
    itemId: string;
  }
  export interface ItemUpdateQuantityRequest {
    itemId: string;
    quantity: number;
  }
}
