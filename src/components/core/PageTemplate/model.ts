import { ContainerProps } from '@material-ui/core/Container';

export type PageTemplateModel = {
  title: string;
  isLoading?: boolean;
  error?: string;
  maxContainerWidth?: ContainerProps['maxWidth'];
};
