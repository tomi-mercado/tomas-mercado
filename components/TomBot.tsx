import React, { useEffect, useState } from 'react';
import { FaPaperPlane as SendIcon } from 'react-icons/fa';

interface TomBotProps {
  description: string;
  placeholder: string;
}

type TomBotStatus = 'iddle' | 'loading' | 'success' | 'error';

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

const NotIddleWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={`text-left flex gap-2 bg-neutral-content text-neutral p-3 rounded-sm w-full text-sm border-2 border-white ${className}`}
  >
    {children}
  </div>
);

const TESTING_TIMEOUT = 3000;

const TomBot: React.FC<TomBotProps> = ({ description, placeholder }) => {
  const [status, setStatus] = useState<TomBotStatus>('iddle');
  const [questionValue, setQuestionValue] = useState('');
  const loadingMessage = useLoadingMessage(status);

  const actions = {
    iddle: {
      onSubmit: () => {
        if (!questionValue) {
          return;
        }

        setStatus('loading');

        setTimeout(() => {
          actions.loading.onSuccess();
        }, TESTING_TIMEOUT);
      },
    },
    loading: {
      onSuccess: () => {
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
      },
    },
    error: {
      onRetry: () => {
        setStatus('loading');
        setTimeout(() => {
          actions.loading.onSuccess();
        }, TESTING_TIMEOUT);
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

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        getAction('submit')?.();
      }}
    >
      <p className="text-lg">{description} 🤖</p>

      <div className="relative min-h-[150px]">
        {
          {
            iddle: (
              <>
                <textarea
                  className="textarea textarea-primary w-full pr-10 no-scroll h-full min-h-[inherit]"
                  placeholder={placeholder}
                  value={questionValue}
                  onChange={(event) => setQuestionValue(event.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-square btn-xs absolute bottom-4 right-3"
                >
                  <SendIcon />
                </button>
              </>
            ),
            loading: (
              <NotIddleWrapper>
                <span className="loading loading-spinner block" />
                <p>{loadingMessage}</p>
              </NotIddleWrapper>
            ),
            success: (
              <NotIddleWrapper className="flex-col">
                <p>
                  You: <br /> - {questionValue}
                </p>
                <p>
                  TomBot: <br /> - A nice response here!
                </p>
                <button
                  className="btn btn-primary btn-xs self-end"
                  onClick={() => {
                    getAction('again')?.();
                  }}
                >
                  Ask again (3 remaining)
                </button>
              </NotIddleWrapper>
            ),
            error: (
              <NotIddleWrapper className="border-error flex-col">
                <p className="text-center">
                  TomBot is not available right now 😢
                </p>
                <button
                  className="btn btn-primary btn-xs self-end"
                  onClick={() => {
                    getAction('retry')?.();
                  }}
                >
                  Retry
                </button>
              </NotIddleWrapper>
            ),
          }[status]
        }
      </div>
    </form>
  );
};

export default TomBot;
