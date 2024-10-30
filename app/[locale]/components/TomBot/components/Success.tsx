import { useContent } from 'contexts/content';
import remarkGfm from 'remark-gfm';
import replaceRemainingQuestions from 'utils/replaceRemainingQuestions';

import React from 'react';
import ReactMarkdown from 'react-markdown';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import NotIddleWrapper from './NotIddleWrapper';

interface SuccessProps {
  questionValue: string;
  response: string;
  remaining: number;
  onRetry: () => void;
}

const TIME_EACH_LETTER_IN_MS = 10;

const useTypingEffect = (text: string) => {
  const [typedText, setTypedText] = React.useState('');
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTypedText(text.slice(0, index + 1));
      setIndex((prev) => prev + 1);
    }, TIME_EACH_LETTER_IN_MS);
    return () => clearTimeout(timer);
  }, [index, text]);

  return typedText;
};

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

  const typedResponse = useTypingEffect(response);

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
          {`${typedResponse}`}
        </ReactMarkdown>
      </p>
      <Button className="self-end" onClick={onRetry} size="sm">
        {replaceRemainingQuestions(askAgain, remaining)}
      </Button>
    </NotIddleWrapper>
  );
};

export default Success;
