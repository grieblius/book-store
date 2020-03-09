import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import BookCard from '@components/common/Loader/BookCard';
import useBooksState from '@store/books/hooks';
import useOrdersState from '@store/orders/hooks';
import usePageTemplate from '@src/hooks/usePageTemplate';

const Home: React.FC = () => {
  const [{ books }, { isBooksListLoading, booksListError }, { listRequest }] = useBooksState();
  const [,
    { isOrdersItemAddLoading, ordersItemAddError },
    { itemAddRequest, itemAddError },
  ] = useOrdersState();
  const isLoading = isBooksListLoading || isOrdersItemAddLoading;
  const error = booksListError || ordersItemAddError;

  usePageTemplate('Book list', isLoading, error);

  React.useEffect(() => {
    listRequest();

    return () => {
      if (ordersItemAddError) {
        itemAddError({ error: null });
      }
    };
  }, []);

  if (isBooksListLoading) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      {!isBooksListLoading && books?.map((book) => (
        <Grid key={book.id} item sm={6} xs={12}>
          <BookCard book={book} onAddToCart={itemAddRequest} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
