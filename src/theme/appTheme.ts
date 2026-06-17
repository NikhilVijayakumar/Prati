import { createTheme, ThemeOptions } from '@mui/material/styles';
import { colors } from './tokens/colors';
import { typography } from './tokens/typography';

// Map our custom spacing (base 4px) to MUI's 8px default system
const muiSpacing = (factor: number) => `${Math.round(factor * 8)}px`;

// Global component UI overrides for the premium feel
const defaultComponents = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(150, 150, 150, 0.3)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(150, 150, 150, 0.5)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none', // Disable MUI's default elevation overlay
        boxShadow: 'none',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        borderRadius: '6px',
        '&:hover': { boxShadow: 'none' },
      },
    },
  },
};

const baseLightOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: colors.primary, light: colors.primaryHover },
    secondary: { main: colors.secondary },
    background: {
      default: colors.background.light,
      paper: colors.background.paperLight,
    },
    text: {
      primary: colors.text.primaryLight,
      secondary: colors.text.secondaryLight,
    },
    error: { main: colors.status.error },
    warning: { main: colors.status.warning },
    info: { main: colors.status.info },
    success: { main: colors.status.success },
    divider: colors.border.light,
  },
  typography,
  spacing: muiSpacing,
  components: defaultComponents,
};

const baseDarkOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: colors.primary, light: colors.primaryHover },
    secondary: { main: colors.secondary },
    background: {
      default: colors.background.dark,
      paper: colors.background.paperDark,
    },
    text: {
      primary: colors.text.primaryDark,
      secondary: colors.text.secondaryDark,
    },
    error: { main: colors.status.error },
    warning: { main: colors.status.warning },
    info: { main: colors.status.info },
    success: { main: colors.status.success },
    divider: colors.border.dark,
  },
  typography,
  spacing: muiSpacing,
  components: defaultComponents,
};

export const lightTheme = createTheme(baseLightOptions);
export const darkTheme = createTheme(baseDarkOptions);

/**
 * Creates custom light and dark themes by merging base Astra tokens with client overrides.
 *
 * @param lightOverrides - MUI ThemeOptions to override in light mode.
 * @param darkOverrides - MUI ThemeOptions to override in dark mode.
 * @returns { lightTheme, darkTheme } to be passed to ThemeProvider.
 */
export const createAstraTheme = (
  lightOverrides?: ThemeOptions,
  darkOverrides?: ThemeOptions
) => {
  return {
    lightTheme: createTheme(baseLightOptions, lightOverrides ?? {}),
    darkTheme: createTheme(baseDarkOptions, darkOverrides ?? {}),
  };
};
