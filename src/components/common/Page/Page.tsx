import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

const Page: React.FC<Props> = ({ children }: Props) => (
  <div>
    <h1>Page</h1>
    {children}
  </div>
);

export default Page;
