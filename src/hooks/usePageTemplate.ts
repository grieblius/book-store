import * as React from 'react';

import { AppContext } from '@components/App';
import { PageTemplateModel } from '@components/core/PageTemplate';

const usePageTemplate = (props: PageTemplateModel) => {
  const ctx = React.useContext(AppContext);

  React.useEffect(() => {
    ctx.setPageTemplateProps(props);
  }, [
    props.title,
    props.isLoading,
    props.error,
    props.maxContainerWidth,
  ]);
};

export default usePageTemplate;
