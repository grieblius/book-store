import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { BookStoreModel } from '@src/model';

type Props = {
  book: BookStoreModel.Book;
  noWrapper?: boolean;
  onAddToCart: (payload: BookStoreModel.OrderItem) => void;
};


const BookCard: React.FC<Props> = ({ book, noWrapper, onAddToCart }: Props) => {
  const handleAddToCart = () => onAddToCart({ book, quantity: 1 });
  const Wrapper = noWrapper ? React.Fragment : Card;

  return (
    <Wrapper>
      <CardMedia
        component="img"
        alt={book.title}
        height="300"
        image={book.book_cover}
        title={book.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {book.title}
        </Typography>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              {book.author}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              {new Date(book.published_date).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            Quantity:
            {' '}
            {book.quantity}
          </Grid>
          <Grid item>
            {book.quantity
              ? (
                <Button size="small" color="primary" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              )
              : 'Out of stock'}
          </Grid>
        </Grid>
      </CardActions>
    </Wrapper>
  );
};
export default BookCard;
