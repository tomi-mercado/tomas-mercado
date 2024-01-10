import { useContent } from 'contexts/content';

import React from 'react';
import { FaPaperPlane as SendIcon } from 'react-icons/fa';

interface IddleProps {
  questionValue: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

const Iddle: React.FC<IddleProps> = ({ onChange, onSubmit, questionValue }) => {
  const {
    content: {
      tombot: { placeholder },
    },
  } = useContent('Home');

  return (
    <>
      <textarea
        className="textarea textarea-primary w-full pr-10 no-scroll h-full min-h-[inherit] bg-secondary"
        placeholder={placeholder}
        value={questionValue}
        onChange={onChange}
        name="question"
        onKeyDown={(e) => {
          // Submit if CMD/CTRL + Enter
          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            onSubmit();
          }
        }}
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
