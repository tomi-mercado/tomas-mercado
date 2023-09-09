import { useEffect, useState } from 'react';

import { TomBotStatus } from './useChatbot';

const loadingMessages = [
  'TomBot is generating an answer...',
  'TomBot is thinking...',
  'TomBot is calculating...',
  'TomBot is searching for an answer...',
  'TomBot is looking for an answer...',
];

const getRandomLoadingMessage = () => {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
};

const useLoadingMessage = (status: TomBotStatus) => {
  const [loadingMessage, setLoadingMessage] = useState(
    getRandomLoadingMessage(),
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (status === 'loading') {
      interval = setInterval(() => {
        setLoadingMessage(getRandomLoadingMessage());
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [status]);

  return loadingMessage;
};

export default useLoadingMessage;
