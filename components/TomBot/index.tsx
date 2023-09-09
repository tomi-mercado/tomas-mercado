import useChatbot from 'hooks/useChatbot';
import useLoadingMessage from 'hooks/useLoadingMessage';

import React from 'react';

import ErrorComponent from './components/Error';
import Iddle from './components/Iddle';
import Loading from './components/Loading';
import ModalLoginRequired from './components/ModalLoginRequired';
import ModalNoCredits from './components/ModalNoCredits';
import Success from './components/Success';

interface TomBotProps {
  description: string;
  placeholder: string;
}

const TomBot: React.FC<TomBotProps> = ({ description, placeholder }) => {
  const {
    status,
    questionValue,
    response,
    isLoginModalOpen,
    user,
    credits,
    setQuestionValue,
    getAction,
  } = useChatbot();

  const loadingMessage = useLoadingMessage(status);

  const renderByStatus = {
    iddle: (
      <Iddle
        onChange={(event) => setQuestionValue(event.target.value)}
        placeholder={placeholder}
        questionValue={questionValue}
      />
    ),
    loading: <Loading message={loadingMessage} />,
    success:
      response && credits ? (
        <Success
          questionValue={questionValue}
          response={response}
          getAction={getAction}
          remaining={credits}
          user={user}
        />
      ) : null,
    error: <ErrorComponent onRetryClick={() => getAction('retry')?.()} />,
    noCredits: (
      <>
        <Iddle
          onChange={(event) => setQuestionValue(event.target.value)}
          placeholder={placeholder}
          questionValue={questionValue}
        />
        <ModalNoCredits />
      </>
    ),
    loadingUserInfo: <Loading message="Loading your data..." />,
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();

        getAction('submit')?.();
      }}
    >
      <div className="flex flex-col gap-1">
        <p className="text-lg">{description} 🤖</p>
        <p className="text-xs text-gray-500">
          Keep in mind that you only have 5 questions available.
        </p>
      </div>

      <div className="relative min-h-[150px]">{renderByStatus[status]}</div>

      {isLoginModalOpen && <ModalLoginRequired />}
    </form>
  );
};

export default TomBot;
