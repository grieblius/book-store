import { action, ErrorActionModel } from '@utils/redux';

import { Types } from './constants';
import { OrdersModel } from './model';

export const listRequest = action(Types.ORDERS.LIST.REQUEST);
export const listReceive = action<OrdersModel.ListResponse>(Types.ORDERS.LIST.RECEIVE);
export const listError = action<ErrorActionModel>(Types.ORDERS.LIST.ERROR);

export const updateStatusRequest = action<OrdersModel.UpdateStatusRequest>(
  Types.ORDERS.UPDATE_STATUS.REQUEST,
);
export const updateStatusReceive = action(Types.ORDERS.UPDATE_STATUS.RECEIVE);
export const updateStatusError = action<ErrorActionModel>(Types.ORDERS.UPDATE_STATUS.ERROR);

export const userListRequest = action(Types.ORDERS.USER.LIST.REQUEST);
export const userListReceive = action<OrdersModel.ListResponse>(Types.ORDERS.USER.LIST.RECEIVE);
export const userListError = action<ErrorActionModel>(Types.ORDERS.USER.LIST.ERROR);

export const userUpdateStatusRequest = action<OrdersModel.UserUpdateStatusRequest>(
  Types.ORDERS.USER.UPDATE_STATUS.REQUEST,
);
export const userUpdateStatusReceive = action(Types.ORDERS.USER.UPDATE_STATUS.RECEIVE);
export const userUpdateStatusError = action<ErrorActionModel>(
  Types.ORDERS.USER.UPDATE_STATUS.ERROR,
);

export const itemAddRequest = action<OrdersModel.ItemAddRequest>(
  Types.ORDERS.ITEM.ADD.REQUEST,
);
export const itemAddReceive = action(Types.ORDERS.ITEM.ADD.RECEIVE);
export const itemAddError = action<ErrorActionModel>(Types.ORDERS.ITEM.ADD.ERROR);

export const itemRemoveRequest = action<OrdersModel.ItemRemoveRequest>(
  Types.ORDERS.ITEM.REMOVE.REQUEST,
);
export const itemRemoveReceive = action(Types.ORDERS.ITEM.REMOVE.RECEIVE);
export const itemRemoveError = action<ErrorActionModel>(Types.ORDERS.ITEM.REMOVE.ERROR);

export const itemUpdateQuantityRequest = action<OrdersModel.ItemUpdateQuantityRequest>(
  Types.ORDERS.ITEM.UPDATE_QUANTITY.REQUEST,
);
export const itemUpdateQuantityReceive = action(Types.ORDERS.ITEM.UPDATE_QUANTITY.RECEIVE);
export const itemUpdateQuantityError = action<ErrorActionModel>(
  Types.ORDERS.ITEM.UPDATE_QUANTITY.ERROR,
);
