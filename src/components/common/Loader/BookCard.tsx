import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { BookStoreModel } from '@src/model';

type Props = {
  book: BookStoreModel.Book;
  onAddToCart: (payload: BookStoreModel.OrderItem) => void;
};


const BookCard: React.FC<Props> = ({ book, onAddToCart }: Props) => {
  const handleAddToCart = () => onAddToCart({ book, quantity: 1 });

  return (
    <Card>
      <CardActionArea>
        <img src={book.book_cover} alt="" />
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
                Published:
                {' '}
                {new Date(book.published_date).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            Quantity:
            {' '}
            {book.quantity}
          </Grid>
          <Grid item>
            <Button size="small" color="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
export default BookCard;
