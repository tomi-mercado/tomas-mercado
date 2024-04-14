import { Locale } from 'utils/locales';

import React, { createContext } from 'react';

interface LocaleContextProps {
  locale: Locale;
}

interface LocaleProviderProps {
  locale: Locale;
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
