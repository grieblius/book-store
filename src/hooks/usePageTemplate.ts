import * as React from 'react';

import { AppContext } from '@components/App';
import { PageTemplateModel } from '@components/core/PageTemplate';

const usePageTemplate = (props: PageTemplateModel) => {
  const appContext = React.useContext(AppContext);
  const {
    title,
    isLoading,
    error,
    maxContainerWidth,
  } = props;

  React.useEffect(() => {
    appContext?.setPageTemplateProps(props);
  }, [
    title,
    isLoading,
    error,
    maxContainerWidth,
  ]);
};

export default usePageTemplate;
