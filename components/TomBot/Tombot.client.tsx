'use client';

import useChatbot from 'hooks/useChatbot';
import { askToTombot } from 'server-actions';
import { HomeContent } from 'utils/content/homeContentValidation';
import replaceMaxQuestions from 'utils/replaceMaxQuestions';

import React from 'react';

import ErrorComponent from './components/Error';
import Iddle from './components/Iddle';
import ModalLoginRequired from './components/ModalLoginRequired';
import ModalNoCredits from './components/ModalNoCredits';
import Success from './components/Success';

interface TombotClientProps {
  content: HomeContent;
  credits: number | undefined;
  errorLoadingCredits?: boolean;
}

const TomBotClient: React.FC<TombotClientProps> = ({
  content,
  credits,
  errorLoadingCredits,
}) => {
  const {
    status: chatbotStatus,
    questionValue,
    response,
    isLoginModalOpen,
    user,
    setQuestionValue,
    actions,
  } = useChatbot({
    credits,
  });
  const status = errorLoadingCredits ? 'error' : chatbotStatus;

  const {
    tombot: { description, loadingMessages, aclaration, maxQuestions },
  } = content;

  // const loadingMessage = useLoadingMessage(isPending, loadingMessages)

  const renderByStatus = {
    // loading: <Loading message={loadingMessage} />,
    iddle: (
      <Iddle
        onChange={(event) => setQuestionValue(event.target.value)}
        questionValue={questionValue}
        loadingMessages={loadingMessages}
      />
    ),
    success:
      response && credits !== undefined ? (
        <Success
          questionValue={questionValue}
          response={response}
          onRetry={() => actions.success.onNewQuestion()}
          remaining={credits}
          user={user}
        />
      ) : null,
    error: <ErrorComponent onRetryClick={() => actions.error.onRetry()} />,
    noCredits: (
      <>
        <Iddle
          onChange={(event) => setQuestionValue(event.target.value)}
          questionValue={questionValue}
          loadingMessages={loadingMessages}
        />
        <ModalNoCredits />
      </>
    ),
  };

  return (
    <form
      className="flex flex-col gap-3 w-full items-center"
      // @ts-expect-error
      action={async (formData) => {
        const isSubmittable = actions.iddle.onSubmit();

        if (!isSubmittable) {
          return;
        }

        try {
          const response = await askToTombot(formData);
          actions.loading.onSuccess(response);
        } catch (e) {
          actions.loading.onError();
        }
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

export default TomBotClient;
