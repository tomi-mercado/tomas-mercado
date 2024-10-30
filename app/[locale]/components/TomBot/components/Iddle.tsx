import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
      <Textarea
        className="h-full min-h-[inherit]"
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
      <Button
        type="submit"
        className="absolute bottom-4 right-3"
        size="icon"
        aria-label="Send question"
      >
        <SendIcon />
      </Button>
    </>
  );
};

export default Iddle;
