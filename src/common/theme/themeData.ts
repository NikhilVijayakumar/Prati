//path : src\common\theme\themeData.ts
import type { ReactNode } from 'react';
import type { Theme } from '@mui/material/styles'; // Import the MUI Theme type

export type ThemeContextValue = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

// Add lightTheme and darkTheme to the provider's props
export type ThemeProviderProps = {
  children: ReactNode;
  lightTheme: Theme;
  darkTheme: Theme;
};
