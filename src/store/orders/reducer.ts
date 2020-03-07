import { ActionModel } from '@utils/redux';
import { Types } from './constants';
import { OrdersModel } from './model';

export const initialState: OrdersModel.Reducer = {
  orders: [],
  userOrders: [],
  activeOrder: null,
};

export default (
  state: OrdersModel.Reducer = initialState,
  action:
  | ActionModel<OrdersModel.ListResponse, typeof Types.ORDERS.LIST.RECEIVE>
  | ActionModel<OrdersModel.ListResponse, typeof Types.ORDERS.USER.LIST.RECEIVE>,
): OrdersModel.Reducer => {
  switch (action.type) {
    case Types.ORDERS.LIST.RECEIVE: {
      const { orders } = action.payload;

      return {
        ...state,
        orders,
      };
    }
    case Types.ORDERS.USER.LIST.RECEIVE: {
      const { orders } = action.payload;

      return {
        ...state,
        userOrders: orders,
      };
    }
    default: {
      return state;
    }
  }
};
