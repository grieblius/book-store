import * as React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';


import Loader from '@components/common/Loader';
import useUsersState from '@store/users/hooks';
import useOrdersState from '@store/orders/hooks';

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
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Box display="flex" alignItems="center">
                {activeUser?.role === 'admin' && (
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                )}
                <Typography variant="h6">
                  <Link color="inherit" underline="none" component={RouterLink} to="/">
                    Book Store
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              {!activeUser
                ? (<Button color="inherit" onClick={handleLogin}>Login</Button>)
                : (
                  <Box display="flex" alignItems="center">
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
                    </IconButton>
                    <Box ml={1}>
                      <Typography variant="caption" noWrap>
                        {activeUser.name}
                        {' '}
                        {activeUser.surname}
                      </Typography>
                    </Box>
                  </Box>
                )}
            </Grid>
          </Grid>
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
      <Loader open={isLoading} />
    </>
  );
};


PageTemplate.defaultProps = {
  isLoading: false,
};

export default PageTemplate;
