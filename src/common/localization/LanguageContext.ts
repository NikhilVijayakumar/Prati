//src/common/localization/LanguageContext.ts
import { createContext, useContext } from 'react';

export type LanguageDefinition = {
  code: string;
  label: string;
};

export type LanguageContextValue = {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  literal: Record<string, string>;
  availableLanguages: LanguageDefinition[];
};

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a AstraLanguageProvider');
  }
  return context;
}
