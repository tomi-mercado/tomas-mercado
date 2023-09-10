import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { useUser } from '@auth0/nextjs-auth0/client';

import useDebounce from './useDebounce';

export type TomBotStatus =
  | 'iddle'
  | 'loading'
  | 'loadingUserInfo'
  | 'success'
  | 'error'
  | 'noCredits';

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

const useChatbot = () => {
  // Chatbot
  const [status, setStatus] = useState<TomBotStatus>('iddle');
  const [questionValue, setQuestionValue] = useState(
    getQuestionValueFromLocalStorage,
  );
  const [response, setResponse] = useState<string | null>(null);

  const { data: credits, refetch: refetchCredits } = useQuery({
    queryFn: async () => {
      setStatus('loadingUserInfo');

      const r = await fetch('/api/chatbot/credits');
      const response = (await r.json()) as
        | { credits: number }
        | { error: string };

      if (!r.ok) {
        if (r.status === 401) {
          setStatus('iddle');
          return undefined;
        }

        const errorResponse = response as { error: string };
        throw new Error(errorResponse.error);
      }

      const successResponse = response as { credits: number };
      return successResponse.credits;
    },
    onError: () => {
      actions.loading.onError();
    },
    onSuccess: () => {
      setStatus('iddle');
    },
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });

  useDebounce(
    () => {
      writeQuestionValueToLocalStorage(questionValue);
    },
    1000,
    [questionValue],
  );

  // Auth
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, isLoading: loadingAuth, error: errorAuth } = useUser();

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
      onSubmit: async () => {
        if (!questionValue) {
          return;
        }

        if (!user) {
          openLoginRequiredModal();
          return;
        }

        if (credits === 0) {
          setStatus('noCredits');
          openNoCreditsModal();
          return;
        }

        setStatus('loading');

        try {
          const r = await fetch('/api/chatbot', {
            method: 'POST',
            body: JSON.stringify({ prompt: questionValue }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!r.ok) {
            throw new Error('Error');
          }

          const data = (await r.json()) as { response: string };
          await refetchCredits();
          actions.loading.onSuccess(data.response);
        } catch (e) {
          actions.loading.onError();
        }
      },
    },
    loading: {
      onSuccess: (response: string) => {
        setStatus('success');
        // Simulate typing
        const splitResponse = response.split('');
        let i = 0;
        setResponse(() => splitResponse[0]);
        const interval = setInterval(() => {
          setResponse((prev) => {
            if (!prev) {
              return splitResponse[i];
            }

            if (!splitResponse[i]) {
              return prev;
            }

            return prev + splitResponse[i];
          });
          i++;

          if (i === splitResponse.length) {
            clearInterval(interval);
          }
        }, 5);
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

  const getAction = (action: 'submit' | 'again' | 'retry') => {
    if (action === 'submit') {
      switch (status) {
        case 'iddle':
          return actions.iddle.onSubmit;
        case 'error':
          return actions.error.onRetry;
        case 'noCredits':
          return actions.iddle.onSubmit;
        default:
          throw new Error(
            `Action ${action} is not available on status ${status}`,
          );
      }
    }

    if (action === 'again') {
      switch (status) {
        case 'success':
          return actions.success.onNewQuestion;
        default:
          throw new Error(
            `Action ${action} is not available on status ${status}`,
          );
      }
    }

    if (action === 'retry') {
      switch (status) {
        case 'error':
          return actions.error.onRetry;
        default:
          throw new Error(
            `Action ${action} is not available on status ${status}`,
          );
      }
    }
  };

  return {
    user,
    status,
    questionValue,
    response,
    isLoginModalOpen,
    credits,
    openLoginRequiredModal,
    setQuestionValue,
    getAction,
  };
};

export default useChatbot;
