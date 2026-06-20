
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LoadingState } from './LoadingState';

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
    // The outer Box has role="status" — the CircularProgress is aria-hidden
    const statusRegion = screen.getByRole('status');
    expect(statusRegion).toBeTruthy();
  });

  it('renders the localized loading message', () => {
    render(<LoadingState />);
    expect(screen.getByText('Loading Mock...')).toBeTruthy();
  });
});
