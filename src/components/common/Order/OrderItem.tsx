import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { BookStoreModel } from '@src/model';

type Props = {
  item: BookStoreModel.OrderItem;
  allowEdit?: boolean;
  onItemQuantityChange?: (id: string, quantity: number) => void;
  onItemRemove?: (id: string) => void;
};

const OrderItem: React.FC<Props> = ({
  item, allowEdit, onItemQuantityChange: onQuantityChange, onItemRemove: onRemove,
}: Props) => {
  const handleRemove = () => onRemove(item.book.id);

  const handleItemQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => onQuantityChange(item.book.id, parseInt(event.target.value, 10));

  return (
    <Grid key={item.book.id} container spacing={3}>
      <Grid item xs={3} sm={2} md={2}>
        <img
          src={item.book.book_cover}
          alt={item.book.title}
          width={100}
        />
      </Grid>
      <Grid item xs={5} sm={6} md={8}>{item.book.title}</Grid>
      {allowEdit ? (
        <>
          <Grid item xs={2} md={1}>
            <TextField
              label="Quantity"
              type="number"
              defaultValue={item.quantity}
              variant="outlined"
              size="small"
              onChange={handleItemQuantityChange}
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <IconButton aria-label="remove" onClick={handleRemove}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </>
      ) : (
        <Grid item xs={4} md={2}>
          Quantity:
          {' '}
          {item.quantity}
        </Grid>
      )}
    </Grid>
  );
};

export default OrderItem;
