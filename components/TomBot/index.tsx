import useChatbot from 'hooks/useChatbot';
import useLoadingMessage from 'hooks/useLoadingMessage';

import React from 'react';
import { useQuery } from 'react-query';

import ErrorComponent from './components/Error';
import Iddle from './components/Iddle';
import Loading from './components/Loading';
import ModalLoginRequired from './components/ModalLoginRequired';
import Success from './components/Success';

interface TomBotProps {
  description: string;
  placeholder: string;
}

const TomBot: React.FC<TomBotProps> = ({ description, placeholder }) => {
  const {
    data: credits,
    error: errorCredits,
    isLoading: loadingCredits,
    refetch: refetchCredits,
  } = useQuery({
    queryFn: async () => {
      const r = await fetch('/api/chatbot/credits');
      const response = (await r.json()) as
        | { credits: number }
        | { error: string };

      if (!r.ok) {
        const errorResponse = response as { error: string };
        throw new Error(errorResponse.error);
      }

      const successResponse = response as { credits: number };
      return successResponse.credits;
    },
    cacheTime: 0,
  });

  const {
    loadingAuth,
    status,
    questionValue,
    response,
    isLoginModalOpen,
    user,
    setQuestionValue,
    getAction,
  } = useChatbot(refetchCredits);

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
          Keep in mind that you only 5 questions available.
        </p>
      </div>

      {(loadingAuth || loadingCredits) && <p>Loading your data...</p>}
      {!loadingAuth && (
        <div className="relative min-h-[150px]">{renderByStatus[status]}</div>
      )}

      {isLoginModalOpen && <ModalLoginRequired />}
    </form>
  );
};

export default TomBot;
