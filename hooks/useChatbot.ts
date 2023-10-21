import { useEffect, useState } from 'react';

import { useUser } from '@auth0/nextjs-auth0/client';

import useDebounce from './useDebounce';

export type TomBotStatus = 'iddle' | 'success' | 'error' | 'noCredits';

const getQuestionValueFromLocalStorage = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  const questionValue = localStorage.getItem('questionValue');

  if (!questionValue) {
    return '';
  }

  return questionValue;
};

const writeQuestionValueToLocalStorage = (questionValue: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('questionValue', questionValue);
};

const cleanQuestionValueFromLocalStorage = () => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem('questionValue');
};

interface UseChatbotArgs {
  credits: number | undefined;
}

const useChatbot = ({ credits }: UseChatbotArgs) => {
  const [status, setStatus] = useState<TomBotStatus>('iddle');

  const [questionValue, setQuestionValue] = useState(
    getQuestionValueFromLocalStorage,
  );
  const [response, setResponse] = useState<string | null>(null);

  useDebounce(
    () => {
      writeQuestionValueToLocalStorage(questionValue);
    },
    1000,
    [questionValue],
  );

  // Auth
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useUser();

  const openLoginRequiredModal = () => {
    setIsLoginModalOpen(true);
    setTimeout(() => {
      // @ts-expect-error
      document.getElementById('login-modal')?.showModal();
    }, 100);
  };

  const openNoCreditsModal = () => {
    setTimeout(() => {
      // @ts-expect-error
      document.getElementById('no-credits-modal')?.showModal();
    }, 100);
  };

  useEffect(() => {
    setQuestionValue(getQuestionValueFromLocalStorage);
  }, []);

  const actions = {
    iddle: {
      onSubmit: () => {
        if (!questionValue) {
          return false;
        }

        if (!user) {
          openLoginRequiredModal();
          return false;
        }

        if (credits === 0) {
          setStatus('noCredits');
          openNoCreditsModal();
          return false;
        }

        return true;
      },
    },
    loading: {
      onSuccess: (response: string) => {
        setStatus('success');
        setResponse(response);

        // Simulate typing
        // const splitResponse = response.split('');
        // let i = 0;
        // setResponse(() => splitResponse[0]);
        // const interval = setInterval(() => {
        //   setResponse((prev) => {
        //     if (!prev) {
        //       return splitResponse[i];
        //     }

        //     if (!splitResponse[i]) {
        //       return prev;
        //     }

        //     return prev + splitResponse[i];
        //   });
        //   i++;

        //   if (i === splitResponse.length) {
        //     clearInterval(interval);
        //   }
        // }, 5);
      },
      onError: () => {
        setStatus('error');
      },
    },
    success: {
      onNewQuestion: () => {
        setStatus('iddle');
        setQuestionValue('');
        cleanQuestionValueFromLocalStorage();
        setResponse(null);
      },
    },
    error: {
      onRetry: () => {
        actions.iddle.onSubmit();
      },
    },
  };

  return {
    user,
    status,
    questionValue,
    response,
    isLoginModalOpen,
    openLoginRequiredModal,
    setQuestionValue,
    actions,
  };
};

export default useChatbot;
