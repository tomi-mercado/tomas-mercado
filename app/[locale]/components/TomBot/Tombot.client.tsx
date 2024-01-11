'use client';

import useChatbot from 'hooks/useChatbot';
import useLoadingMessage from 'hooks/useLoadingMessage';
import { HomeContent } from 'utils/content/homeContentValidation';
import replaceMaxQuestions from 'utils/replaceMaxQuestions';

import React from 'react';

import ErrorComponent from './components/Error';
import Iddle from './components/Iddle';
import Loading from './components/Loading';
import ModalLoginRequired from './components/ModalLoginRequired';
import ModalNoCredits from './components/ModalNoCredits';
import Success from './components/Success';

interface TombotClientProps {
  content: HomeContent;
  /**
   * If undefined, the user is not logged in or there was an error loading the credits
   */
  credits: number | undefined;
  /**
   * If true, the user is logged in but there was an error loading the credits
   */
  errorLoadingCredits?: boolean;
}

const TomBotClient: React.FC<TombotClientProps> = ({
  content,
  credits,
  errorLoadingCredits,
}) => {
  const {
    status,
    questionValue,
    response,
    isLoginModalOpen,
    setQuestionValue,
    actions,
  } = useChatbot({
    credits: {
      amount: credits,
      error: errorLoadingCredits || false,
    },
  });

  const handleSubmit = () => {
    actions.iddle.submit();
  };

  const {
    tombot: { description, loadingMessages, aclaration, maxQuestions },
  } = content;

  const loadingMessage = useLoadingMessage(
    status === 'loading',
    loadingMessages,
  );

  const renderByStatus = {
    loading: <Loading message={loadingMessage} />,
    iddle: (
      <Iddle
        onChange={(event) => setQuestionValue(event.target.value)}
        questionValue={questionValue}
        onSubmit={handleSubmit}
      />
    ),
    success:
      response && credits !== undefined ? (
        <Success
          questionValue={questionValue}
          response={response}
          onRetry={() => actions.success.onNewQuestion()}
          remaining={credits}
        />
      ) : null,
    error: <ErrorComponent onRetryClick={() => actions.error.onRetry()} />,
    noCredits: (
      <>
        <Iddle
          onChange={(event) => setQuestionValue(event.target.value)}
          questionValue={questionValue}
          onSubmit={handleSubmit}
        />
        <ModalNoCredits />
      </>
    ),
  };

  return (
    <form
      className="flex flex-col gap-3 w-full items-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex flex-col gap-1 w-full items-center">
        <p className="text-lg">{description} 🤖</p>
        <p className="text-xs">
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

export default TomBotClient;
