import { useEffect, useState } from 'react';

const getRandomLoadingMessage = (loadingMessages: string[]) => {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
};

const useLoadingMessage = (isOn: boolean, loadingMessages: string[]) => {
  const [loadingMessage, setLoadingMessage] = useState(
    getRandomLoadingMessage(loadingMessages),
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isOn) {
      interval = setInterval(() => {
        setLoadingMessage(getRandomLoadingMessage(loadingMessages));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isOn, loadingMessages]);

  return loadingMessage;
};

export default useLoadingMessage;
