import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import useUsersState from '@store/users/hooks';
import usePageTemplate from '@src/hooks/usePageTemplate';

const SignIn: React.FC = () => {
  const [
    { activeUser },
    { isUsersInitLoading, isUsersLoginLoading, usersLoginError },
    { loginRequest },
  ] = useUsersState();
  const history = useHistory();

  const [username, setUsername] = React.useState<string>(null);
  const [password, setPassword] = React.useState<string>(null);

  React.useEffect(() => {
    if (activeUser) {
      history.push('/');
    }
  }, [activeUser]);

  React.useEffect(() => {
    if (usersLoginError) {
      setPassword(null);
    }
  }, [usersLoginError]);

  const isLoading = isUsersLoginLoading;
  const error = usersLoginError;

  usePageTemplate({
    title: 'Sign in',
    isLoading,
    error,
    maxContainerWidth: 'xs',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginRequest({ username, password });
  };

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => setUsername(event.target.value);
  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => setPassword(event.target.value);

  if (isUsersInitLoading) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="User Name"
        name="username"
        autoFocus
        onChange={handleUsernameChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={handlePasswordChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Sign In
      </Button>
    </form>
  );
};
export default SignIn;
