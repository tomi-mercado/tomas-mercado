import useChatbot from 'hooks/useChatbot';
import remarkGfm from 'remark-gfm';

import React, { useEffect, useState } from 'react';
import {
  FaGoogle as GoogleIcon,
  FaPaperPlane as SendIcon,
} from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

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

const TomBot: React.FC<TomBotProps> = ({ description, placeholder }) => {
  const {
    loadingAuth,
    status,
    questionValue,
    response,
    isLoginModalOpen,
    setQuestionValue,
    getAction,
  } = useChatbot();

  const loadingMessage = useLoadingMessage(status);

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();

        getAction('submit')?.();
      }}
    >
      <p className="text-lg">{description} 🤖</p>

      {loadingAuth && <p>Loading your data...</p>}
      {!loadingAuth && (
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
                    🙎 You: <br /> {questionValue}
                  </p>
                  <p>
                    🤖 TomBot: <br />
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {`${response}`}
                    </ReactMarkdown>
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
      )}

      {isLoginModalOpen && (
        <dialog id="login-modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              You are almost ready to ask TomBot 🤖
            </h3>
            <p className="py-4">You need to be logged in to ask.</p>
            <div className="modal-action">
              <button className="btn btn-error">Close</button>
              <a className="btn btn-primary" href="/api/auth/login">
                <GoogleIcon />
                Login with Google
              </a>
            </div>
          </div>
        </dialog>
      )}
    </form>
  );
};

export default TomBot;
