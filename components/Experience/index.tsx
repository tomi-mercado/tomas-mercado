import Layout from 'components/Layout';

import React from 'react';

import { Content, Side } from './components';

const Experience: React.FC = () => {
  return (
    <Layout sideComponent={<Side />}>
      <Content />
    </Layout>
  );
};

export default Experience;
