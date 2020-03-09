import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { BookStoreModel } from '@src/model';
import OrderItem from './OrderItem';

type Props = {
  order: BookStoreModel.Order;
  isAdmin?: boolean;
  onStatusChange?: (status: BookStoreModel.OrderStatus, id?: string) => void;
  onItemQuantityChange?: (id: string, quantity: number) => void;
  onItemRemove?: (id: string) => void;
};

const Order: React.FC<Props> = ({
  order,
  isAdmin,
  onStatusChange,
  onItemQuantityChange,
  onItemRemove,
}: Props) => {
  const isUserActiveOrder = !isAdmin && order.status === 'new';
  const handleStatusChange = (
    status: BookStoreModel.OrderStatus,
    id?: string,
  ) => () => onStatusChange(status, id);

  return (
    <Box my={3}>
      <Grid container spacing={3} component={Paper}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              Order No:
              {' '}
              {order.id}
            </Grid>
            <Grid item xs={12}>
              {order.items.map((item) => (
                <OrderItem
                  key={item.book.id}
                  item={item}
                  allowEdit={!isAdmin && order.status === 'new'}
                  onItemQuantityChange={onItemQuantityChange}
                  onItemRemove={onItemRemove}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3} justify="space-between" alignItems="center">
                <Grid item xs={3}>
                  Status:
                  {' '}
                  {order.status}
                </Grid>

                <Grid item xs={7} sm={4} md={3}>
                  <Box display="flex" mx={3} justifyContent="space-between">
                    {isUserActiveOrder && (
                      <>
                        <Button variant="contained" color="primary" onClick={handleStatusChange('paid')}>
                          Pay
                        </Button>
                        <Button variant="contained" onClick={handleStatusChange('canceled')}>Cancel</Button>
                      </>
                    )}
                    {isAdmin && (
                      <>
                        <Button variant="contained" color="primary" onClick={handleStatusChange('sent', order.id)}>
                          Send
                        </Button>
                        <Button variant="contained" onClick={handleStatusChange('canceled', order.id)}>Cancel</Button>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Order;
