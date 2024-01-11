import React, { createContext } from 'react';

interface LocaleContextProps {
  locale: 'en' | 'es';
}

interface LocaleProviderProps {
  locale: 'en' | 'es';
  children: React.ReactNode;
}

const LocaleContext = createContext<LocaleContextProps>({
  locale: 'en',
});

export const LocaleProvider: React.FC<LocaleProviderProps> = ({
  children,
  locale,
}) => {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  );
};
