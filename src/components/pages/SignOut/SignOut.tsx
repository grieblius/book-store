import * as React from 'react';
import { Redirect } from 'react-router';

import useUsersStore from '@store/users/hooks';

const SignOut: React.FC = () => {
  const [{ activeUser }, ,{ logoutRequest }] = useUsersStore();

  React.useEffect(() => {
    logoutRequest();
  });

  return !activeUser ? <Redirect to="/" /> : null;
};

export default SignOut;
