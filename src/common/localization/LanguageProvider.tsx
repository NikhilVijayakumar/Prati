//src\common\localization\LanguageProvider.tsx
import { useState, useEffect, ReactNode } from 'react';
import { LanguageContext, LanguageDefinition } from './LanguageContext';

export type TranslationMap = {
  [key: string]: Record<string, string>;
};

interface LanguageProviderProps {
  children: ReactNode;
  translations: TranslationMap;
  availableLanguages: LanguageDefinition[];
  defaultLanguage?: string;
}

export function LanguageProvider({
  children,
  translations,
  availableLanguages,
  defaultLanguage = 'en',
}: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);

 const [literal, setLiteral] = useState(translations[defaultLanguage] || {});

  useEffect(() => {
    setLiteral(translations[currentLanguage] || {});
  }, [currentLanguage, translations]);


  const contextValue = {
    currentLanguage,
    setCurrentLanguage,
    literal,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
