import useChatbot from 'hooks/useChatbot';
import remarkGfm from 'remark-gfm';

import React from 'react';
import ReactMarkdown from 'react-markdown';

import NotIddleWrapper from './NotIddleWrapper';

interface SuccessProps {
  questionValue: string;
  response: string;
  getAction: ReturnType<typeof useChatbot>['getAction'];
  remaining: number;
}

const Success: React.FC<SuccessProps> = ({
  questionValue,
  response,
  getAction,
  remaining,
}) => {
  return (
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
        Ask again ({remaining} remaining)
      </button>
    </NotIddleWrapper>
  );
};

export default Success;
