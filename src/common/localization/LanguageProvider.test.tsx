import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from './LanguageProvider';
import { useLanguage } from './LanguageContext';


// Test Component to consume context
const TestComponent = () => {
    const { literal, currentLanguage, setCurrentLanguage } = useLanguage();
    return (
        <div>
            <span data-testid="lang-code">{currentLanguage}</span>
            <span data-testid="greeting">{literal['greeting']}</span>
            <button onClick={() => setCurrentLanguage('es')}>Switch to Spanish</button>
        </div>
    );
};

describe('LanguageProvider', () => {
    const translations = {
        en: { greeting: 'Hello' },
        es: { greeting: 'Hola' },
    };
    const availableLanguages = [
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Spanish' },
    ];

    it('should provide default language and literals', () => {
        render(
            <LanguageProvider translations={translations} availableLanguages={availableLanguages}>
                <TestComponent />
            </LanguageProvider>
        );

        expect(screen.getByTestId('lang-code').textContent).toBe('en');
        expect(screen.getByTestId('greeting').textContent).toBe('Hello');
    });

    it('should switch language and update literals', () => {
        render(
            <LanguageProvider translations={translations} availableLanguages={availableLanguages}>
                <TestComponent />
            </LanguageProvider>
        );

        fireEvent.click(screen.getByText('Switch to Spanish'));

        expect(screen.getByTestId('lang-code').textContent).toBe('es');
        // This assertion is expected to fail if the bug exists
        expect(screen.getByTestId('greeting').textContent).toBe('Hola');
    });
});
