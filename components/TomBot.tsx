import React from 'react';
import { FaPaperPlane as SendIcon } from 'react-icons/fa';

interface TomBotProps {
  description: string;
  placeholder: string;
}

const TomBot: React.FC<TomBotProps> = ({ description, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg">{description} 🤖</p>
      <div className="relative">
        <textarea
          className="textarea textarea-primary w-full pr-10 no-scroll"
          placeholder={placeholder}
        />
        <button className="btn btn-primary btn-square btn-xs absolute bottom-[50%] top-[50%] transform translate-y-[-50%] right-2">
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default TomBot;
