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

      console.log(orders);

      return {
        ...state,
        orders,
      };
    }
    case Types.ORDERS.USER.LIST.RECEIVE: {
      const { orders } = action.payload;

      const activeOrder = orders.find((order) => order.status === 'new');
      const userOrders = orders.filter((order) => order.status !== 'new');

      return {
        ...state,
        userOrders,
        activeOrder,
      };
    }
    default: {
      return state;
    }
  }
};
