import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => createStyles({
  backdrop: {
    zIndex: 1000,
  },
}));

type Props = {
  open: boolean;
};

const Loader: React.FC<Props> = ({ open }: Props) => {
  const classes = useStyles();

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
