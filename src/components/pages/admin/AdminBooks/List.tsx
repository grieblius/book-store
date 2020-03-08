import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import useBooksState from '@store/books/hooks';
import usePage from '@src/hooks/usePage';

const List: React.FC = () => {
  const [
    { books },
    {
      isBooksListLoading, isBooksDeleteLoading, booksListError, booksDeleteError,
    },
    { listRequest, deleteRequest },
  ] = useBooksState();
  const history = useHistory();

  React.useEffect(() => {
    listRequest();
  }, []);

  const isLoading = isBooksListLoading || isBooksDeleteLoading;
  const error = booksListError || booksDeleteError;

  usePage('Books Management', isLoading, error);

  const handleAdd = () => history.push('/admin/books/form');
  const handleEdit = (id: string) => () => history.push(`/admin/books/form/${id}`);
  const handleDelete = (id: string) => () => deleteRequest({ id });

  return (
    <>
      <Box m={2} display="flex" justifyContent="flex-end">
        <Fab color="primary" onClick={handleAdd} aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Published</TableCell>
              <TableCell>Cover</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((book) => (
              <TableRow key={book.id}>
                <TableCell>
                  <IconButton onClick={handleEdit(book.id)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={handleDelete(book.id)} aria-label="delete">
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {book.title}
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell align="right">{new Date(book.published_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Box width="25%">
                    <img src={book.book_cover} alt={book.title} />
                  </Box>
                </TableCell>
                <TableCell align="right">{book.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
