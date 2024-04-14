import { askToTombot } from 'server-actions';

import { useEffect, useState, useTransition } from 'react';

import useDebounce from './useDebounce';

type TomBotStatus = 'iddle' | 'success' | 'error' | 'noCredits' | 'loading';

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
  credits: {
    amount: number | undefined;
    error: boolean;
  };
}

const useChatbot = ({ credits }: UseChatbotArgs) => {
  const [status, setStatus] = useState<TomBotStatus>('iddle');

  const [questionValue, setQuestionValue] = useState(
    getQuestionValueFromLocalStorage,
  );
  const [response, setResponse] = useState<string | null>(null);

  const [isLoading, startTransition] = useTransition();

  useDebounce(
    () => {
      writeQuestionValueToLocalStorage(questionValue);
    },
    1000,
    [questionValue],
  );

  // Auth
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
      submit: () => {
        if (!questionValue) {
          return;
        }

        // This means that the user is not logged in
        if (credits.amount === undefined && !credits.error) {
          openLoginRequiredModal();
          return;
        }

        if (credits.amount === 0) {
          setStatus('noCredits');
          openNoCreditsModal();
          return;
        }

        startTransition(() => {
          (async () => {
            try {
              const response = await askToTombot(questionValue);
              actions.loading.onSuccess(response);
            } catch (error) {
              actions.loading.onError();
            }
          })();
        });
      },
    },
    loading: {
      onSuccess: (response: string) => {
        setStatus('success');
        setResponse(response);
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
        actions.iddle.submit();
      },
    },
  };

  return {
    status: credits.error ? 'error' : isLoading ? 'loading' : status,
    questionValue,
    response,
    isLoginModalOpen,
    openLoginRequiredModal,
    setQuestionValue,
    actions,
  };
};

export default useChatbot;
