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
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import People from '@material-ui/icons/People';
import MenuBook from '@material-ui/icons/MenuBook';


import Loader from '@components/common/Loader';
import useUsersState from '@store/users/hooks';
import useOrdersState from '@store/orders/hooks';
import { PageTemplateModel } from './model';

type Props = PageTemplateModel & {
  children: React.ReactNode;
};

const PageTemplate: React.FC<Props> = ({
  title,
  children,
  isLoading,
  error,
  maxContainerWidth,
}: Props) => {
  const [{ activeUser }] = useUsersState();
  const [{ activeOrder }] = useOrdersState();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>(null);
  const [orderCount, setOrderCount] = React.useState<number>(0);
  const [isDrawerShown, setIsDrawerShown] = React.useState(false);

  React.useEffect(() => {
    if (activeOrder) {
      const newOrderCount = activeOrder.items.reduce((sum, item) => {
        let newSum = sum;

        newSum += item.quantity;

        return newSum;
      }, 0);

      setOrderCount(newOrderCount);
    } else {
      setOrderCount(0);
    }
  }, [activeOrder]);

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
  const handleAdminUsers = () => history.push('/admin/users');
  const handleAdminBooks = () => history.push('/admin/books');
  const handleAdminOrders = () => history.push('/admin/orders');

  const handleToggleDrawer = (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown'
      && ((event as React.KeyboardEvent).key === 'Tab'
        || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsDrawerShown(!isDrawerShown);
  };

  const menuId = 'primary-search-account-menu';

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Box display="flex" alignItems="center">
                {activeUser?.role === 'admin' && (
                <IconButton onClick={handleToggleDrawer} edge="start" color="inherit" aria-label="menu">
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

      <Drawer open={isDrawerShown} onClose={handleToggleDrawer}>
        <Box
          width={300}
          onClick={handleToggleDrawer}
          onKeyDown={handleToggleDrawer}
        >
          <List>
            <ListItem onClick={handleAdminUsers} button>
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem onClick={handleAdminBooks} button>
              <ListItemIcon><MenuBook /></ListItemIcon>
              <ListItemText primary="Books" />
            </ListItem>
            <ListItem onClick={handleAdminOrders} button>
              <ListItemIcon><ShoppingCart /></ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Container maxWidth={maxContainerWidth}>
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
  maxContainerWidth: 'md',
};

export default PageTemplate;
