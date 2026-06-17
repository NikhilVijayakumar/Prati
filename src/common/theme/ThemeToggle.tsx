//path src\common\components\theme\ThemeToggle.tsx
import { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { ThemeContextValue } from './themeData';

export const ThemeToggle: FC<{ themeContext: ThemeContextValue }> = ({
  themeContext,
}) => {
  const { darkMode, toggleDarkMode } = themeContext;

  return (
    <IconButton onClick={toggleDarkMode} aria-label="Toggle theme">
      {darkMode ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
};
