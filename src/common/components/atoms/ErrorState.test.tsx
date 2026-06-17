
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorState from './ErrorState';

// Mock the useLanguage hook
vi.mock('../../localization/LanguageContext', () => ({
  useLanguage: () => ({
    literal: {
      unknown_message: 'Unknown Error Mock',
    },
  }),
}));

describe('ErrorState', () => {
  it('renders with a custom message when provided', () => {
    const customMessage = 'Something went wrong';
    render(<ErrorState message={customMessage} />);
    
    expect(screen.getByText(customMessage)).toBeTruthy();
  });

  it('renders with the default localized message when no message is provided', () => {
    render(<ErrorState />);
    
    expect(screen.getByText('Unknown Error Mock')).toBeTruthy();
  });
});
