import React from 'react';

import { Spinner } from '../../Spinner';
import NotIddleWrapper from './NotIddleWrapper';

interface LoadingProps {
  message: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <NotIddleWrapper>
      <div className="flex flex-col items-center gap-4">
        <Spinner />
        <p>{message}</p>
      </div>
    </NotIddleWrapper>
  );
};

export default Loading;
