
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoadingState from './LoadingState';

// Mock the useLanguage hook
vi.mock('../../localization/LanguageContext', () => ({
  useLanguage: () => ({
    literal: {
      loading_message: 'Loading Mock...',
    },
  }),
}));

describe('LoadingState', () => {
  it('renders the loading spinner', () => {
    render(<LoadingState />);
    // CircularProgress has role="progressbar"
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeTruthy();
  });

  it('renders the localized loading message', () => {
    render(<LoadingState />);
    expect(screen.getByText('Loading Mock...')).toBeTruthy();
  });
});
