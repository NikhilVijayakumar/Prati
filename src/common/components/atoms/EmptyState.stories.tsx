import type { Meta, StoryObj } from '@storybook/react';
import EmptyState from './EmptyState';

// The meta object contains information about the story.
const meta: Meta<typeof EmptyState> = {
  // 1. The story is now grouped under "Components/Wrapper/EmptyState".
  title: 'Components/Wrapper/EmptyState',
  component: EmptyState,
  // 2. This tag enables automatic documentation generation for this story.
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A simple component that displays a localized "empty state" message. It takes no props and derives its text from the `LanguageContext`. Use the globe icon in the toolbar to see the language change.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// 3. The story is now much simpler.
// Since the component takes no props, we don't need to provide any `args`.
// It will automatically use the global LanguageProvider you configured.
export const Default: Story = {};
