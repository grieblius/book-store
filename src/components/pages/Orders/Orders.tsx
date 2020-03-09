import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import useOrdersState from '@store/orders/hooks';
import usePageTemplate from '@src/hooks/usePageTemplate';
import { BookStoreModel } from '@src/model';
import Order from '@components/common/Order/Order';

const Orders: React.FC = () => {
  const [
    { userOrders, activeOrder },
    {
      isOrdersUserListLoading,
      isOrdersUserUpdateStatusLoading,
      isOrdersItemUpdateQuantityLoading,
      isOrdersItemRemoveLoading,
      ordersUserListError,
      ordersUserUpdateStatusError,
      ordersItemUpdateQuantityError,
      ordersItemRemoveError,
    },
    {
      userListRequest,
      userUpdateStatusRequest,
      itemRemoveRequest,
      itemUpdateQuantityRequest,
    },
  ] = useOrdersState();

  React.useEffect(() => {
    userListRequest();
  }, []);

  const isLoading = isOrdersUserListLoading
    || isOrdersUserUpdateStatusLoading
    || isOrdersItemUpdateQuantityLoading
    || isOrdersItemRemoveLoading;
  const error = ordersUserListError
    || ordersUserUpdateStatusError
    || ordersItemUpdateQuantityError
    || ordersItemRemoveError;

  usePageTemplate({ title: 'My orders', isLoading, error });

  const handleStatusChange = (
    status: BookStoreModel.OrderStatus,
  ) => userUpdateStatusRequest({ status });

  const handleItemRemove = (
    itemId: string,
  ) => itemRemoveRequest({ itemId });

  const handleItemQuantityChange = (
    itemId: string,
    quantity: number,
  ) => itemUpdateQuantityRequest({ itemId, quantity });


  return (
    <>
      {activeOrder && (
        <>
          <Typography variant="h5" component="h2" gutterBottom>
            New Order
          </Typography>
          <Order
            order={activeOrder}
            onItemQuantityChange={handleItemQuantityChange}
            onItemRemove={handleItemRemove}
            onStatusChange={handleStatusChange}
          />
        </>
      )}
      {Boolean(userOrders?.length) && (
        <>
          <Typography variant="h5" component="h2" gutterBottom>
            Order History
          </Typography>
          {userOrders.map((order) => (
            <Order
              key={order.id}
              order={order}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Orders;
