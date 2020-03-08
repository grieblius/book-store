import * as React from 'react';

import { AppContext } from '@components/App';

const usePage = (pageTitle: string, isLoading: boolean, error: string) => {
  const { setPageTitle, setIsLoading, setError } = React.useContext(AppContext);

  React.useEffect(() => {
    setPageTitle(pageTitle);
  }, [pageTitle]);

  React.useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  React.useEffect(() => {
    setError(error);
  }, [error]);
};

export default usePage;
