import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Backdrop,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Box,
  Badge,
  Menu,
  MenuItem,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

import useUsersState from '@store/users/hooks';
import useOrdersState from '@store/orders/hooks';

const useStyles = makeStyles(() => createStyles({
  toolbarButtons: {
    marginLeft: 'auto',
  },
}));

type Props = {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  error?: string;
};

const PageTemplate: React.FC<Props> = ({
  title,
  children,
  isLoading,
  error,
}: Props) => {
  const [{ activeUser }] = useUsersState();
  const [{ userOrders }] = useOrdersState();
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>(null);
  const [orderCount, setOrderCount] = React.useState<number>(0);

  React.useEffect(() => {
    if (userOrders.length) {
      const newOrder = userOrders.find((order) => order.status === 'new');

      if (newOrder) {
        setOrderCount(newOrder.items.length);
      }
    } else {
      setOrderCount(0);
    }
  }, [userOrders]);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => history.push('/login');
  const handleLogout = () => {
    history.push('/logout');
    handleMenuClose();
  };

  const handleOrders = () => {
    history.push('/orders');
    handleMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleOrders}>My orders</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {activeUser?.role === 'admin' && (
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6">
            Book Store
          </Typography>
          <div className={classes.toolbarButtons}>
            {!activeUser
              ? (<Button color="inherit" onClick={handleLogin}>Login</Button>)
              : (
                <>
                  <IconButton onClick={handleOrders} color="inherit">
                    <Badge badgeContent={orderCount} color="secondary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                    {' '}
                    {activeUser?.name}
                  </IconButton>
                </>
              )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Container maxWidth="sm">
        {error && (
        <Box my={4}>
          <Alert severity="error">{error}</Alert>
        </Box>
        )}
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          {children}
        </Box>
      </Container>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};


PageTemplate.defaultProps = {
  isLoading: false,
};

export default PageTemplate;
