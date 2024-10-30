import React, { useEffect } from 'react';

import NotIddleWrapper from './NotIddleWrapper';

interface LoadingProps {
  message: string;
}

const Spinner = () => {
  useEffect(() => {
    const load = async () => {
      const { helix } = await import('ldrs');
      helix.register();
    };
    load();
  }, []);
  return <l-helix size="45" speed="2.5" color="white" />;
};

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
