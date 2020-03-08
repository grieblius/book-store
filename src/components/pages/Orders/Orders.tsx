import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

import PageTemplate from '@components/core/PageTemplate';
import useOrdersState from '@store/orders/hooks';

const Orders: React.FC = () => {
  const [
    { userOrders },
    { isOrdersListLoading, ordersListError },
    { userListRequest },
  ] = useOrdersState();

  React.useEffect(() => {
    userListRequest();
  }, []);

  const isLoading = isOrdersListLoading;
  const error = ordersListError;

  return (
    <PageTemplate title="My orders" isLoading={isLoading} error={error}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order No.</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">User Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userOrders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell align="right">{order.status}</TableCell>
                <TableCell align="right">{order.userId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageTemplate>
  );
};

export default Orders;
