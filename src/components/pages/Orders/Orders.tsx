import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import useOrdersState from '@store/orders/hooks';
import usePageTemplate from '@src/hooks/usePageTemplate';

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

  usePageTemplate({ title: 'My orders', isLoading, error });

  return (
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
  );
};

export default Orders;
