import { useEffect, useState } from 'react';

import { TomBotStatus } from './useChatbot';

const getRandomLoadingMessage = (loadingMessages: string[]) => {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
};

const useLoadingMessage = (status: TomBotStatus, loadingMessages: string[]) => {
  const [loadingMessage, setLoadingMessage] = useState(
    getRandomLoadingMessage(loadingMessages),
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (status === 'loading') {
      interval = setInterval(() => {
        setLoadingMessage(getRandomLoadingMessage(loadingMessages));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [status, loadingMessages]);

  return loadingMessage;
};

export default useLoadingMessage;
