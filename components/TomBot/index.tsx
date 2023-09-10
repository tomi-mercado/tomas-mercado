import { useContent } from 'contexts/content';
import useChatbot from 'hooks/useChatbot';
import useLoadingMessage from 'hooks/useLoadingMessage';
import replaceMaxQuestions from 'utils/replaceMaxQuestions';

import React from 'react';

import ErrorComponent from './components/Error';
import Iddle from './components/Iddle';
import Loading from './components/Loading';
import ModalLoginRequired from './components/ModalLoginRequired';
import ModalNoCredits from './components/ModalNoCredits';
import Success from './components/Success';

const TomBot: React.FC = () => {
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

  const {
    content: {
      tombot: {
        description,
        loadingMessages,
        loadingYourData,
        aclaration,
        maxQuestions,
      },
    },
  } = useContent('Home');

  const loadingMessage = useLoadingMessage(status, loadingMessages);

  const renderByStatus = {
    iddle: (
      <Iddle
        onChange={(event) => setQuestionValue(event.target.value)}
        questionValue={questionValue}
      />
    ),
    loading: <Loading message={loadingMessage} />,
    success:
      response && credits !== undefined ? (
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
          questionValue={questionValue}
        />
        <ModalNoCredits />
      </>
    ),
    loadingUserInfo: <Loading message={loadingYourData} />,
  };

  return (
    <form
      className="flex flex-col gap-3 w-full items-center"
      onSubmit={(event) => {
        event.preventDefault();

        getAction('submit')?.();
      }}
    >
      <div className="flex flex-col gap-1 w-full items-center">
        <p className="text-lg">{description} 🤖</p>
        <p className="text-xs text-gray-500">
          {replaceMaxQuestions(aclaration, maxQuestions)}
        </p>
      </div>

      <div className="relative min-h-[150px] max-w-xl w-full flex justify-center">
        {renderByStatus[status]}
      </div>

      {isLoginModalOpen && <ModalLoginRequired />}
    </form>
  );
};

export default TomBot;
