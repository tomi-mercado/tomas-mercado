import useChatbot from 'hooks/useChatbot';
import remarkGfm from 'remark-gfm';

import React from 'react';
import ReactMarkdown from 'react-markdown';

import Image from 'next/image';

import NotIddleWrapper from './NotIddleWrapper';

interface SuccessProps {
  user: ReturnType<typeof useChatbot>['user'];
  questionValue: string;
  response: string;
  remaining: number;
  getAction: ReturnType<typeof useChatbot>['getAction'];
}

const Success: React.FC<SuccessProps> = ({
  user,
  questionValue,
  response,
  getAction,
  remaining,
}) => {
  const you = user?.name || 'You';

  return (
    <NotIddleWrapper className="flex-col">
      <p>
        <span className="flex gap-1">
          {user?.picture ? (
            <Image
              src={user.picture}
              alt={user.name || 'Google profile image'}
              width={16}
              height={16}
              className="rounded-full object-cover"
            />
          ) : (
            <>🙎</>
          )}
          {you}:
        </span>{' '}
        {questionValue}
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
        Ask again ({remaining} remaining)
      </button>
    </NotIddleWrapper>
  );
};

export default Success;
