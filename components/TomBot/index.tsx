import useChatbot from 'hooks/useChatbot';
import useLoadingMessage from 'hooks/useLoadingMessage';

import React from 'react';

import Error from './components/Error';
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
    loadingAuth,
    status,
    questionValue,
    response,
    isLoginModalOpen,
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
    success: response ? (
      <Success
        questionValue={questionValue}
        response={response}
        getAction={getAction}
        remaining={5}
      />
    ) : null,
    error: <Error onRetryClick={() => getAction('retry')?.()} />,
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();

        getAction('submit')?.();
      }}
    >
      <p className="text-lg">{description} 🤖</p>

      {loadingAuth && <p>Loading your data...</p>}
      {!loadingAuth && (
        <div className="relative min-h-[150px]">{renderByStatus[status]}</div>
      )}

      {isLoginModalOpen && <ModalLoginRequired />}
    </form>
  );
};

export default TomBot;
