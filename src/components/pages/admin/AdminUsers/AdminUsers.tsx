import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import useUsersState from '@store/users/hooks';
import usePageTemplate from '@src/hooks/usePageTemplate';

const AdminUsers: React.FC = () => {
  const [
    { users },
    { isUsersListLoading, usersListError },
    { listRequest },
  ] = useUsersState();

  React.useEffect(() => {
    listRequest();
  }, []);

  const isLoading = isUsersListLoading;
  const error = usersListError;

  usePageTemplate('Users Management', isLoading, error);

  if (isUsersListLoading || !users?.length) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.surname}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminUsers;
