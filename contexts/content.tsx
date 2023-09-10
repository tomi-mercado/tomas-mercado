import { HomeContent } from 'utils/content/homeContentValidation';

import React, { createContext, useContext } from 'react';

interface ContentContextProps {
  content: HomeContent;
}

interface ContentProviderProps {
  content: HomeContent;
  children: React.ReactNode;
}

const ContentContext = createContext<ContentContextProps | null>(null);

export const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
  content,
}) => {
  return (
    <ContentContext.Provider value={{ content }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const content = useContext(ContentContext);

  if (!content) {
    throw new Error('useContent must be used within a ContentProvider');
  }

  return content;
};
