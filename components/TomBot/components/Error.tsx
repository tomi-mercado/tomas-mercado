import React from 'react';

import NotIddleWrapper from './NotIddleWrapper';

interface ErrorProps {
  onRetryClick: () => void;
}

const Error: React.FC<ErrorProps> = ({ onRetryClick }) => {
  return (
    <NotIddleWrapper className="border-error flex-col">
      <p className="text-center">TomBot is not available right now 😢</p>
      <button
        className="btn btn-primary btn-xs self-end"
        onClick={onRetryClick}
      >
        Retry
      </button>
    </NotIddleWrapper>
  );
};

export default Error;
