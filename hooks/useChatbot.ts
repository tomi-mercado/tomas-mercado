import { useEffect, useState } from 'react';
import { QueryObserverResult } from 'react-query';

import { useUser } from '@auth0/nextjs-auth0/client';

import useDebounce from './useDebounce';

export type TomBotStatus = 'iddle' | 'loading' | 'success' | 'error';

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

const useChatbot = (
  refetchCredits: () => Promise<QueryObserverResult<number, unknown>>,
) => {
  // Chatbot
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
  const { user, isLoading: loadingAuth } = useUser();

  const openLoginRequiredModal = () => {
    setIsLoginModalOpen(true);
    setTimeout(() => {
      // @ts-expect-error
      document.getElementById('login-modal')?.showModal();
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
        setResponse(response);
        setStatus('success');
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
    loadingAuth,
    status,
    questionValue,
    response,
    isLoginModalOpen,
    setQuestionValue,
    getAction,
  };
};

export default useChatbot;
