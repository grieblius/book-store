import * as React from 'react';
import Alert from '@material-ui/lab/Alert';

import Order from '@components/common/Order/Order';
import { BookStoreModel } from '@src/model';
import useOrdersState from '@store/orders/hooks';
import usePageTemplate from '@src/hooks/usePageTemplate';

const AdminOrders: React.FC = () => {
  const [
    { orders },
    {
      isOrdersListLoading,
      isOrdersUpdateStatusLoading,
      ordersListError,
      ordersUpdateStatusError,
    },
    {
      listRequest,
      updateStatusRequest,
    },
  ] = useOrdersState();

  React.useEffect(() => {
    listRequest();
  }, []);

  const isLoading = isOrdersListLoading || isOrdersUpdateStatusLoading;
  const error = ordersListError || ordersUpdateStatusError;

  usePageTemplate({ title: 'Orders Management', isLoading, error });

  const handleStatusChange = (
    status: BookStoreModel.OrderStatus,
    id?: string,
  ) => updateStatusRequest({ id, status });

  if (isOrdersListLoading) {
    return null;
  }

  if (!orders?.length) {
    return <Alert severity="info">No new or paid orders.</Alert>;
  }

  return (
    <>
      {orders.map((order) => (
        <Order
          key={order.id}
          order={order}
          isAdmin
          onStatusChange={handleStatusChange}
        />
      ))}

    </>
  );
};

export default AdminOrders;
