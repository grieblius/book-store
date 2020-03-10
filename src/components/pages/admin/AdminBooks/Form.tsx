import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import useBooksState from '@store/books/hooks';
import usePageTemplate from '@src/hooks/usePageTemplate';
import { BookStoreModel } from '@src/model';

type UrlParams = {
  id?: string;
};

const Form: React.FC = () => {
  const [
    { activeBook },
    {
      isBooksCreateLoading,
      isBooksEditLoading,
      isBooksItemLoading,
      isBooksListLoading,
      booksCreateError,
      booksEditError,
      booksItemError,
    },
    { createRequest, editRequest, itemRequest },
  ] = useBooksState();
  const { id } = useParams<UrlParams>();
  const history = useHistory();
  const [values, setValues] = React.useState<BookStoreModel.Book>(null);

  React.useEffect(() => {
    if (id) {
      itemRequest({ id });
    } else {
      setValues({
        id: null,
        title: '',
        author: '',
        published_date: new Date().toISOString().slice(0, 10),
        book_cover: '',
        quantity: 0,
      });
    }
  }, []);

  React.useEffect(() => {
    if (id && activeBook?.id === id) {
      setValues(activeBook);
    }
  }, [activeBook]);

  React.useEffect(() => {
    if (isBooksListLoading) {
      history.push('/admin/books');
    }
  }, [isBooksListLoading]);

  const isLoading = isBooksCreateLoading || isBooksEditLoading || isBooksItemLoading;
  const error = booksCreateError || booksEditError || booksItemError;
  const titleSuffix = id ? 'Edit' : 'New';
  const buttonTitle = id ? 'Update' : 'Create';

  usePageTemplate({
    title: `Books Management - ${titleSuffix}`,
    isLoading,
    error,
    maxContainerWidth: 'sm',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const quantity = parseInt(values.quantity.toString(), 10);
    const book = { ...values, quantity };

    if (id) {
      editRequest({ book });
    } else {
      createRequest({ book });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    const newValues = { ...values, [name]: value };

    setValues(newValues);
  };

  if (!values) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Title"
        name="title"
        defaultValue={values.title}
        autoFocus
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Author"
        name="author"
        defaultValue={values.author}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Published date"
        name="published_date"
        type="date"
        defaultValue={values.published_date}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Book cover (enter picture url)"
        name="book_cover"
        defaultValue={values.book_cover}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Quantity in stock"
        name="quantity"
        type="number"
        defaultValue={values.quantity}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        {buttonTitle}
      </Button>
    </form>
  );
};

export default Form;
