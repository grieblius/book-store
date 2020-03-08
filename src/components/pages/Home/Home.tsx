import * as React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from '@material-ui/core';

import PageTemplate from '@components/core/PageTemplate';
import useBooksState from '@store/books/hooks';
import useOrdersState from '@store/orders/hooks';

const Home: React.FC = () => {
  const [{ books }, { isBooksListLoading, booksListError }, { listRequest }] = useBooksState();
  const [, { isOrdersItemAddLoading, ordersItemAddError }, { itemAddRequest }] = useOrdersState();

  React.useEffect(() => {
    listRequest();
  }, []);

  const isLoading = isBooksListLoading || isOrdersItemAddLoading;
  const error = booksListError || ordersItemAddError;

  return (
    <PageTemplate title="Book list" isLoading={isLoading} error={error}>
      {books?.map((book) => (
        <div key={book.id}>
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
                  <Button size="small" color="primary" onClick={() => itemAddRequest({ book, quantity: 1 })}>
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </div>
      ))}
    </PageTemplate>
  );
};

export default Home;
