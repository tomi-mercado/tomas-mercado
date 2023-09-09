import { useState } from 'react';

import { useUser } from '@auth0/nextjs-auth0/client';

export type TomBotStatus = 'iddle' | 'loading' | 'success' | 'error';

const useChatbot = () => {
  // Chatbot
  const [status, setStatus] = useState<TomBotStatus>('iddle');
  const [questionValue, setQuestionValue] = useState('');
  const [response, setResponse] = useState<string | null>(null);

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
