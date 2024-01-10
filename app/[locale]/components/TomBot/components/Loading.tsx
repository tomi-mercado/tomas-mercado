import React from 'react';

import NotIddleWrapper from './NotIddleWrapper';

interface LoadingProps {
  message: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <NotIddleWrapper>
      <span className="loading loading-spinner block" />
      <p>{message}</p>
    </NotIddleWrapper>
  );
};

export default Loading;
