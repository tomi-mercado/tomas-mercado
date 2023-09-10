import { useContent } from 'contexts/content';

import React from 'react';

import NotIddleWrapper from './NotIddleWrapper';

interface ErrorProps {
  onRetryClick: () => void;
}

const Error: React.FC<ErrorProps> = ({ onRetryClick }) => {
  const {
    content: {
      tombot: { notAvailable, retry },
    },
  } = useContent();
  return (
    <NotIddleWrapper className="border-error flex-col">
      <p className="text-center">{notAvailable} 😢</p>
      <button
        className="btn btn-primary btn-xs self-end"
        onClick={onRetryClick}
      >
        {retry}
      </button>
    </NotIddleWrapper>
  );
};

export default Error;
