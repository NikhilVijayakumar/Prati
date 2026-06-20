//path : src\common\theme\ThemeContext.ts
import { createContext, useContext } from 'react';
import type { ThemeContextValue } from './themeData';

export const ThemeContext = createContext<ThemeContextValue>(
  {} as ThemeContextValue
);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context.darkMode === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
