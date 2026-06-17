
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmptyState from './EmptyState';

// Mock the useLanguage hook
vi.mock('../../localization/LanguageContext', () => ({
  useLanguage: () => ({
    literal: {
      no_data_found: 'No Data Found Mock',
    },
  }),
}));

describe('EmptyState', () => {
  it('renders with the localized message', () => {
    render(<EmptyState />);
    const messageElement = screen.getByText('No Data Found Mock');
    expect(messageElement).toBeTruthy();
  });
});
