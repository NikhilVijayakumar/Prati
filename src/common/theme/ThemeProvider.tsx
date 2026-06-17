// src/common/theme/ThemeProvider.tsx
// path: src/common/theme/ThemeProvider.tsx
import { useState, useMemo } from "react";
import { ThemeContext } from "./themeContext";
import { ThemeProviderProps } from "./themeData";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";

// We extend the original props type to add our optional prop
type ControllableThemeProviderProps = ThemeProviderProps & {
  /** Optional prop to externally control the theme mode, for Storybook integration */
  forceTheme?: "light" | "dark";
};

export function ThemeProvider({
  children,
  lightTheme,
  darkTheme,
  forceTheme, // This prop will be passed from Storybook
}: ControllableThemeProviderProps) {
  // The component's internal state, used by default in your app
  const [internalDarkMode, setInternalDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("darkMode");
        return stored === "true";
      } catch {
        return false;
      }
    }
    return false;
  });

  // If forceTheme is provided, it overrides the internal state.
  const darkMode = forceTheme ? forceTheme === "dark" : internalDarkMode;

  // The toggle function will only work when a theme isn't being forced.
  const toggleDarkMode = () => {
    if (!forceTheme) {
      const newMode = !internalDarkMode;
      setInternalDarkMode(newMode);
      try {
        localStorage.setItem("darkMode", String(newMode));
      } catch {
        // Silently fail - theme state is already updated
      }
    }
  };

  const theme = useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode, lightTheme, darkTheme],
  );

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
