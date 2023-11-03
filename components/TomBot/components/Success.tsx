import { useContent } from 'contexts/content';
import remarkGfm from 'remark-gfm';
import replaceRemainingQuestions from 'utils/replaceRemainingQuestions';

import React from 'react';
import ReactMarkdown from 'react-markdown';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

import NotIddleWrapper from './NotIddleWrapper';

interface SuccessProps {
  questionValue: string;
  response: string;
  remaining: number;
  onRetry: () => void;
}

const Success: React.FC<SuccessProps> = ({
  questionValue,
  response,
  onRetry,
  remaining,
}) => {
  const {
    content: {
      tombot: { askAgain },
    },
  } = useContent('Home');
  const { user } = useUser();
  const you = user?.name || 'You';

  return (
    <NotIddleWrapper className="flex-col gap-4 items-start">
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
      <button className="btn btn-primary btn-xs self-end" onClick={onRetry}>
        {replaceRemainingQuestions(askAgain, remaining)}
      </button>
    </NotIddleWrapper>
  );
};

export default Success;
