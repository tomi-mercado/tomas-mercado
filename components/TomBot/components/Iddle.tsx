import { useContent } from 'contexts/content';
import useLoadingMessage from 'hooks/useLoadingMessage';

import React from 'react';
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { FaPaperPlane as SendIcon } from 'react-icons/fa';

import Loading from './Loading';

interface IddleProps {
  loadingMessages: string[];
  questionValue: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Iddle: React.FC<IddleProps> = ({
  onChange,
  questionValue,
  loadingMessages,
}) => {
  const {
    content: {
      tombot: { placeholder },
    },
  } = useContent('Home');

  const { pending } = useFormStatus();
  const loadingMessage = useLoadingMessage(pending, loadingMessages);

  if (pending) {
    return <Loading message={loadingMessage} />;
  }

  return (
    <>
      <textarea
        className="textarea textarea-primary w-full pr-10 no-scroll h-full min-h-[inherit]"
        placeholder={placeholder}
        value={questionValue}
        onChange={onChange}
        name="question"
      />
      <button
        type="submit"
        className="btn btn-primary btn-square btn-xs absolute bottom-4 right-3"
      >
        <SendIcon />
      </button>
    </>
  );
};

export default Iddle;
