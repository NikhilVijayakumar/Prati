import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './themeContext';
import { createTheme } from '@mui/material/styles';


// Mocks
const lightTheme = createTheme({ palette: { mode: 'light' } });
const darkTheme = createTheme({ palette: { mode: 'dark' } });

// Test Component
const TestComponent = () => {
    const { darkMode, toggleDarkMode } = useTheme();
    return (
        <div>
            <span data-testid="mode">{darkMode ? 'Dark' : 'Light'}</span>
            <button onClick={toggleDarkMode}>Toggle</button>
        </div>
    );
};

describe('ThemeProvider', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should default to light mode (false)', () => {
        render(
            <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('mode').textContent).toBe('Light');
    });

    it('should load preference from localStorage', () => {
        localStorage.setItem('darkMode', 'true');
        render(
            <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('mode').textContent).toBe('Dark');
    });

    it('should toggle theme and save to localStorage', () => {
        render(
            <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
                <TestComponent />
            </ThemeProvider>
        );

        const button = screen.getByText('Toggle');
        fireEvent.click(button);

        expect(screen.getByTestId('mode').textContent).toBe('Dark');
        expect(localStorage.getItem('darkMode')).toBe('true');

        fireEvent.click(button);
        expect(screen.getByTestId('mode').textContent).toBe('Light');
        expect(localStorage.getItem('darkMode')).toBe('false');
    });

    it('should respect forceTheme prop', () => {
        render(
            <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme} forceTheme="dark">
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('mode').textContent).toBe('Dark');
        
        // Toggling should NOT work
        fireEvent.click(screen.getByText('Toggle'));
        expect(screen.getByTestId('mode').textContent).toBe('Dark');
    });
});
