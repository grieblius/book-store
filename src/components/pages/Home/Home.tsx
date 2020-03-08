import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


import useBooksState from '@store/books/hooks';
import useOrdersState from '@store/orders/hooks';
import usePage from '@src/hooks/usePage';

const Home: React.FC = () => {
  const [{ books }, { isBooksListLoading, booksListError }, { listRequest }] = useBooksState();
  const [, { isOrdersItemAddLoading, ordersItemAddError }, { itemAddRequest }] = useOrdersState();
  // const appContext = React.useContext(AppContext);
  const isLoading = isBooksListLoading || isOrdersItemAddLoading;
  const error = booksListError || ordersItemAddError;

  usePage('Book list', isLoading, error);

  React.useEffect(() => {
    listRequest();
    // appContext.setPageTitle('Book list');
  }, []);

  // React.useEffect(() => {
  //   appContext.setIsLoading(isLoading);
  // }, [isLoading]);

  // React.useEffect(() => {
  //   appContext.setError(error);
  // }, [error]);

  return (
    <>
      {!isBooksListLoading && books?.map((book) => (
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
    </>
  );
};

export default Home;
