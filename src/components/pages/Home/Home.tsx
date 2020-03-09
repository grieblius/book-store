import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import BookCard from '@components/common/BookCard';
import useBooksState from '@store/books/hooks';
import useOrdersState from '@store/orders/hooks';
import usePageTemplate from '@src/hooks/usePageTemplate';

const useStyles = makeStyles(() => createStyles({
  card: {
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

const Home: React.FC = () => {
  const [{ books }, { isBooksListLoading, booksListError }, { listRequest }] = useBooksState();
  const [,
    { isOrdersItemAddLoading, ordersItemAddError },
    { itemAddRequest, itemAddError },
  ] = useOrdersState();
  const classes = useStyles();

  const isLoading = isBooksListLoading || isOrdersItemAddLoading;
  const error = booksListError || ordersItemAddError;

  usePageTemplate({ title: 'Book list', isLoading, error });

  React.useEffect(() => {
    listRequest();

    return () => {
      if (ordersItemAddError) {
        itemAddError({ error: null });
      }
    };
  }, []);


  return (
    <Grid container spacing={3}>
      {books?.map((book) => (
        <Grid
          key={book.id}
          item
          md={4}
          sm={6}
          xs={12}
          component={Card}
          className={classes.card}
        >
          <BookCard book={book} onAddToCart={itemAddRequest} noWrapper />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
