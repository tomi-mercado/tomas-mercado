import { LanguageContent } from 'utils/contentValidator';

import React, { createContext, useContext } from 'react';

interface ContentContextProps {
  content: LanguageContent;
}

interface ContentProviderProps {
  content: LanguageContent;
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
