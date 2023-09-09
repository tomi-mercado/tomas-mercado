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
    <NotIddleWrapper className="flex-col gap-4">
      <p>
        <span className="flex gap-1 items-center">
          {user?.picture ? (
            <Image
              src={user.picture}
              alt={user.name || 'Google profile image'}
              width={24}
              height={24}
              className="rounded-full object-cover w-6 h-6"
            />
          ) : (
            <>🙎</>
          )}
          {you}
        </span>{' '}
        <span className="italic">{questionValue}</span>
      </p>

      <p>
        🤖 TomBot
        <br />
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="italic">
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
